import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}
  async create(createTrackDto: CreateTrackDto) {
    const track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
      duration: createTrackDto.duration,
    };
    await this.prisma.track.create({ data: track });
    return track;
  }

  async findAll() {
    const tracks = await this.prisma.track.findMany();
    return tracks;
  }

  async findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not correct uuid', 400);
    }
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (track) {
      return track;
    } else {
      throw new NotFoundException('Track not found');
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not correct uuid', 400);
    }
    // const track = tracks.find((item) => item.id === id);
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!track) {
      throw new NotFoundException('Track not found');
    } else {
      // track.name = updateTrackDto.name || track.name;
      // track.duration = updateTrackDto.duration || track.duration;
      // track.artistId = updateTrackDto.artistId || track.artistId;
      // track.albumId = updateTrackDto.albumId || track.albumId;
      // return track;
      await this.prisma.track.update({
        where: { id: id },
        data: updateTrackDto,
      });
      const updatedTrack = await this.prisma.track.findUnique({
        where: { id: id },
      });
      return updatedTrack;
    }
  }

  async remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not correct uuid', 400);
    }
    const track = await this.prisma.track.findUnique({ where: { id: id } });
    if (!track) {
      throw new NotFoundException('Track not found');
    } else {
      await this.prisma.track.delete({ where: { id: id } });
    }
  }
}
