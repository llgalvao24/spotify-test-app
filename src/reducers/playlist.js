import { ADD_SINGLE_TRACK, REMOVE_TRACK } from "../configuration/constants";

const playlistReducer = (state = { items: [] }, action) => {
  const { track } = action;

  switch (action.type) {
    case ADD_SINGLE_TRACK:
      // only add once
      if (
        state.items.filter((track) => action.track.id === track.id).length > 0
      ) {
        return state; // do nothing --> already in list
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            id: state.items.length,
            ...track,
          },
        ],
      };
    case REMOVE_TRACK:
      return {
        ...state,
        items: state.items.filter((track) => track.id !== action.id),
      };
    default:
      return state;
  }
};

export default playlistReducer;
