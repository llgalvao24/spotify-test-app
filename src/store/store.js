import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import tracksReducer from "../reducers/tracks";
import artistsReducer from "../reducers/artists";
import playlistReducer from "../reducers/playlist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    playlist: playlistReducer,
    tracks: tracksReducer,
    artists: artistsReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
