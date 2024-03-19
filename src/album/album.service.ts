import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: uuidv4(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId || null,
    };
    await this.prisma.album.create({ data: album });
    return album;
  }

  async findAll() {
    const albums = await this.prisma.album.findMany();
    return albums;
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      return album;
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      await this.prisma.album.update({
        where: { id: id },
        data: updateAlbumDto,
      });
      const updatedAlbum = await this.prisma.album.findUnique({
        where: { id: id },
      });
      return updatedAlbum;
    }
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      await this.prisma.album.delete({ where: { id: id } });
      const tracks = await this.prisma.track.findMany({
        where: { albumId: id },
      });
      tracks.forEach(async (track) => {
        await this.prisma.track.update({
          where: { id: track.id },
          data: { albumId: null },
        });
      });
    }
  }
}
