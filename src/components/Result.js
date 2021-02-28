/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from "react";
import { Redirect } from 'react-router-dom';
import TrackList from "./TrackList";

const Result = (props) => {
  const { result, selectedCategory, isValidSession } = props;
  const { tracks } = result;

  if (!isValidSession()) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            session_expired: true
          }
        }}
      />
    );
  }

  return (
    <div className={`${selectedCategory === "tracks" ? "" : "hide"}`}>
      {tracks && <TrackList tracks={tracks} />}
    </div>
  );
};

export default Result;
