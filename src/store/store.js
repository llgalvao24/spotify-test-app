import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import albumsReducer from "../reducers/albums";
import artistsReducer from "../reducers/artists";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    albums: albumsReducer,
    artists: artistsReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
