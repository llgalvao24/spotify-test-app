import { SET_RELEASES, ADD_RELEASES } from "../configuration/constants";

const releasesReducer = (state = {}, action) => {
  const { releases } = action;
  switch (action.type) {
    case SET_RELEASES:
      return releases;
    case ADD_RELEASES:
      return {
        ...state,
        next: releases.next,
        items: [...state.items, ...releases.items],
      };
    default:
      return state;
  }
};
export default releasesReducer;
