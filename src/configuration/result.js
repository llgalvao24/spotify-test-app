import { SET_TRACKS, ADD_TRACKS, SET_ARTISTS, ADD_ARTISTS } from "./constants";
import { get } from "../configuration/api";

export const setTrack = (tracks) => ({
  type: SET_TRACKS,
  tracks,
});

export const addTrack = (tracks) => ({
  type: ADD_TRACKS,
  tracks,
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
      console.log(result);
      dispatch(setTrack(result.tracks));
    } catch (error) {
      console.log("error", error);
    }
  };
};
