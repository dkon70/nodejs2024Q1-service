import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { tracks } from 'src/db/db';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    const track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId || null,
      albumId: createTrackDto.albumId || null,
      duration: createTrackDto.duration,
    };
    tracks.push(track);
    return track;
  }

  findAll() {
    return tracks;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not correct uuid', 400);
    }
    const track = tracks.find((item) => item.id === id);
    if (track) {
      return track;
    } else {
      throw new NotFoundException('Track not found');
    }
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not correct uuid', 400);
    }
    const track = tracks.find((item) => item.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    } else {
      track.name = updateTrackDto.name || track.name;
      track.duration = updateTrackDto.duration || track.duration;
      track.artistId = updateTrackDto.artistId || track.artistId;
      track.albumId = updateTrackDto.albumId || track.albumId;
      return track;
    }
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not correct uuid', 400);
    }
    const track = tracks.find((item) => item.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    } else {
      const index = tracks.indexOf(track);
      tracks.splice(index, 1);
    }
  }
}
