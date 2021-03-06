import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TrackList from "../components/TrackList";
import Loading from "../components/Loading";
import Header from "../components/Header";
import {
  initiateGetResult,
  initialReleases,
  removeFromList,
} from "../actions/result";
import NewReleases from "./NewReleases";
import { addToList } from "../actions/result";

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { isValidSession, history } = props;

  const handleSearch = (searchTerm) => {
    if (isValidSession()) {
      setIsLoading(true);
      props.dispatch(initiateGetResult(searchTerm)).then(() => {
        setIsLoading(false);
      });
    } else {
      history.push({
        pathname: "/",
        state: {
          session_expired: true,
        },
      });
    }
  };

  const onAddClick = (track) => {
    props.dispatch(addToList(track));
  };

  const onRemoveClick = (track) => {
    props.dispatch(removeFromList(track));
  };

  useEffect(() => {
    if (isValidSession()) {
      setIsLoading(true);
      props.dispatch(initialReleases()).then(() => {
        setIsLoading(false);
      });
    } else {
      history.push({
        pathname: "/",
        state: {
          session_expired: true,
        },
      });
    }
  }, []);

  const { tracks, releases, playlist } = props;

  return (
    <>
      {isValidSession() ? (
        <>
          <Loading show={isLoading}>Loading...</Loading>
          <Header handleSearch={handleSearch} history={history} page="home" />
          <NewReleases albums={releases} />
          <h2>Playlist</h2>
          {playlist && (
            <TrackList tracks={playlist} onRemoveClick={onRemoveClick} />
          )}
          <h2>Search list</h2>
          {tracks && <TrackList tracks={tracks} onAddClick={onAddClick} />}
        </>
      ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { session_expired: true },
            }}
          />
        )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    tracks: state.tracks,
    releases: state.releases,
    playlist: state.playlist,
  };
};

Home.propTypes = {
  tracks: PropTypes.shape().isRequired,
  releases: PropTypes.shape().isRequired,
  playlist: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isValidSession: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Home);
