import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate as uuidValidate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { tracks } from 'src/track/track.service';
import { albums } from 'src/album/album.service';

const artists = [];

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    const artist = { id: uuidv4(), name: createArtistDto.name, grammy: createArtistDto.grammy };
    artists.push(artist);
    return artist;
  }

  findAll() {
    return artists;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const artist = artists.find(item => item.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    } else {
      return artist;
    }
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const artist = artists.find(item => item.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    } else {
      artist.name = updateArtistDto.name;
      artist.grammy = updateArtistDto.grammy;
      return artist;
    }
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const artist = artists.find(item => item.id === id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    } else {
      const index = artists.indexOf(artist);
      artists.splice(index, 1);
      tracks.forEach((track) => {
        if (track.artistId === id) {
          track.artistId = null;
        }
      });
      albums.forEach((album) => {
        if (album.artistId === id) {
          album.artistId = null;
        }
      })
      return;
    }
  }
}
