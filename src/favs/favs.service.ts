import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { favs, tracks, albums, artists } from 'src/db/db';
import {
  getAllArtistsByIds,
  getAllAlbumsByIds,
  getAllTracksByIds,
} from 'src/utils/utils';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class FavsService {
  createTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException("Track with such id doesn't exist", 422);
    } else {
      favs.tracks.push(track.id);
      return 'Track added to favorites';
    }
  }

  deleteTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const track = favs.tracks.find((track) => track === id);
    if (!track) {
      throw new NotFoundException('Track is not favorite');
    } else {
      const index = favs.tracks.indexOf(track);
      favs.tracks.splice(index, 1);
    }
  }

  createAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException("Album with such id doesn't exist", 422);
    } else {
      favs.albums.push(album.id);
      return 'Album added to favorites';
    }
  }

  deleteAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const album = favs.albums.find((album) => album === id);
    if (!album) {
      throw new NotFoundException('Album is not favorite');
    } else {
      const index = favs.albums.indexOf(album);
      favs.albums.splice(index, 1);
    }
  }

  createArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new HttpException("Artist with such id doesn't exist", 422);
    } else {
      favs.artists.push(artist.id);
      return 'Artist added to favorites';
    }
  }

  deleteArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('id is not valid uuid', 400);
    }
    const artist = favs.artists.find((artist) => artist === id);
    if (!artist) {
      throw new NotFoundException('Artist is not favorite');
    } else {
      const index = favs.artists.indexOf(artist);
      favs.artists.splice(index, 1);
    }
  }

  findAll() {
    return {
      artists: getAllArtistsByIds(favs.artists),
      albums: getAllAlbumsByIds(favs.albums),
      tracks: getAllTracksByIds(favs.tracks),
    };
  }
}
