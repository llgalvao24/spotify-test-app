import {
  SET_TRACKS,
  ADD_TRACKS,
  SET_ARTISTS,
  ADD_ARTISTS,
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

export const setArtists = (artists) => ({
  type: SET_ARTISTS,
  artists,
});

export const addArtists = (artists) => ({
  type: ADD_ARTISTS,
  artists,
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
      console.log("error", error);
    }
  };
};

export const initialReleases = () => {
  return async (dispatch) => {
    try {
      const result = await get(
        "https://api.spotify.com/v1/browse/new-releases?limit=4"
      );
      dispatch(setArtists(result.albums));
    } catch (error) {
      console.log(error, "new releases error");
    }
  };
};
