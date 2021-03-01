import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import tracksReducer from "../reducers/tracks";
import releasesReducer from "../reducers/releases";
import playlistReducer from "../reducers/playlist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    playlist: playlistReducer,
    tracks: tracksReducer,
    releases: releasesReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
