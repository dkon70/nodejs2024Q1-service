import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate as uuidValidate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  async create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    await this.prisma.artist.create({ data: artist });
    return artist;
  }

  async findAll() {
    const artists = await this.prisma.artist.findMany();
    return artists;
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    } else {
      return artist;
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    } else {
      await this.prisma.artist.update({
        where: { id: id },
        data: updateArtistDto,
      });
      return { id: artist.id, ...updateArtistDto };
    }
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    } else {
      // const index = artists.indexOf(artist);
      // artists.splice(index, 1);
      // tracks.forEach((track) => {
      //   if (track.artistId === id) {
      //     track.artistId = null;
      //   }
      // });
      // albums.forEach((album) => {
      //   if (album.artistId === id) {
      //     album.artistId = null;
      //   }
      // });
      await this.prisma.artist.delete({ where: { id: id } });
      return;
    }
  }
}
