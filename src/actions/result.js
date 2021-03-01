import {
  SET_TRACKS,
  ADD_TRACKS,
  SET_RELEASES,
  ADD_RELEASES,
  ADD_SINGLE_TRACK,
  REMOVE_TRACK,
} from "../configuration/constants";
import { get } from "../configuration/api";

export const setTrack = (tracks) => ({
  type: SET_TRACKS,
  tracks,
});

export const addTrack = (tracks) => ({
  type: ADD_TRACKS,
  tracks,
});

export const addToList = (track) => ({
  type: ADD_SINGLE_TRACK,
  track,
});

export const removeFromList = (id) => ({
  type: REMOVE_TRACK,
  id,
});

export const setReleases = (releases) => ({
  type: SET_RELEASES,
  releases,
});

export const addReleases = (releases) => ({
  type: ADD_RELEASES,
  releases,
});

export const initiateGetResult = (searchTerm) => {
  return async (dispatch) => {
    try {
      const API_URL = `https://api.spotify.com/v1/search?query=${encodeURIComponent(
        searchTerm
      )}&type=track`;
      const result = await get(API_URL);
      dispatch(setTrack(result.tracks));
    } catch (error) {
      console.log(error, "search error");
    }
  };
};

export const initialReleases = () => {
  return async (dispatch) => {
    try {
      const result = await get(
        "https://api.spotify.com/v1/browse/new-releases?limit=5"
      );
      // since new-relases api only returns a simplified album object,
      // it is necessary to make a new request to obtain tracks
      const albumsIds = result.albums.items.map((album) => album.id).join(",");
      const resultAlbums = await get(
        `https://api.spotify.com/v1/albums?ids=${albumsIds}`
      );

      dispatch(setReleases({ items: resultAlbums.albums }));
    } catch (error) {
      console.log(error, "new releases error");
    }
  };
};
