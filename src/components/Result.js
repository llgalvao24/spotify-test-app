/* eslint-disable react/prop-types */
import React from "react";
import { Redirect } from "react-router-dom";
import TrackList from "./TrackList";

const Result = (props) => {
  const { result, isValidSession } = props;
  const { tracks } = result;

  if (!isValidSession()) {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: {
            session_expired: true,
          },
        }}
      />
    );
  }

  return tracks && <TrackList tracks={tracks} />;
};

export default Result;
