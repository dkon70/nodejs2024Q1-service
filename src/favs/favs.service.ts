import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}
  async createTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new HttpException("Track with such id doesn't exist", 422);
    } else {
      await this.prisma.favorites.update({
        where: { id: 1 },
        data: { tracks: { connect: { id } } },
      });
      return 'Track added to favorites';
    }
  }

  async deleteTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('Track is not favorite');
    } else {
      await this.prisma.favorites.update({
        where: { id: 1 },
        data: { tracks: { disconnect: { id } } },
      });
    }
  }

  async createAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    if (!album) {
      throw new HttpException("Album with such id doesn't exist", 422);
    } else {
      await this.prisma.favorites.update({
        where: { id: 1 },
        data: { albums: { connect: { id } } },
      });
      return 'Album added to favorites';
    }
  }

  async deleteAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const album = await this.prisma.album.findUnique({ where: { id: id } });
    if (!album) {
      throw new NotFoundException('Album is not favorite');
    } else {
      await this.prisma.favorites.update({
        where: { id: 1 },
        data: { albums: { disconnect: { id } } },
      });
    }
  }

  async createArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (!artist) {
      throw new HttpException("Artist with such id doesn't exist", 422);
    } else {
      await this.prisma.favorites.update({
        where: { id: 1 },
        data: { artists: { connect: { id } } },
      });
      return 'Artist added to favorites';
    }
  }

  async deleteArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const artist = await this.prisma.artist.findUnique({ where: { id: id } });
    if (!artist) {
      throw new NotFoundException('Artist is not favorite');
    } else {
      await this.prisma.favorites.update({
        where: { id: 1 },
        data: { artists: { disconnect: { id } } },
      });
    }
  }

  async findAll() {
    const favorites = await this.prisma.favorites.findFirst({
      select: { artists: true, albums: true, tracks: true },
    });
    if (!favorites) {
      return { artists: [], albums: [], tracks: [] };
    } else {
      return favorites;
    }
  }
}
