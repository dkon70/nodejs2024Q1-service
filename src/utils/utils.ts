import { tracks, albums, artists } from "src/db/db";

export const getAllTracksByIds = (id: string[]) => {
  if (id.length === 0) {
    return [];
  }
  const searchedTracks = [];
  tracks.forEach((track) => {
    if (id.includes(track.id)) {
      searchedTracks.push(track);
    }
  });
  return searchedTracks;
}

export const getAllAlbumsByIds = (id: string[]) => {
  if (id.length === 0) {
    return [];
  }
  const searchedAlbums = [];
  albums.forEach((album) => {
    if (id.includes(album.id)) {
      searchedAlbums.push(album);
    }
  });
  return searchedAlbums;
}

export const getAllArtistsByIds = (id: string[]) => {
  if (id.length === 0) {
    return [];
  }
  const searchedArtists = [];
  artists.forEach((artist) => {
    if (id.includes(artist.id)) {
      searchedArtists.push(artist);
    }
  });
  return searchedArtists;
}
