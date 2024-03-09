import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { tracks } from 'src/db/db';
import { albums } from 'src/db/db';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    const album = { id: uuidv4(), name: createAlbumDto.name, year: createAlbumDto.year, artistId: createAlbumDto.artistId || null };
    albums.push(album);
    return album;
  }

  findAll() {
    return albums;
  }

  findOne(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const album = albums.find(item => item.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      return album;
    }
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const album = albums.find(item => item.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      album.artistId = updateAlbumDto.artistId || null;
      album.name = updateAlbumDto.name;
      album.year = updateAlbumDto.year;
      return album;
    }
  }

  remove(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const album = albums.find(item => item.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    } else {
      const index = albums.indexOf(album);
      albums.splice(index, 1);
      tracks.forEach((track) => {
        if (track.albumId === id) {
          track.albumId = null;
        }
      })
    }
  }
}
