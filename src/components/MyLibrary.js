/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import { Card, Button } from "react-bootstrap";
import Header from "../components/Header";
import { removeFromList } from "../actions/result";

const MyLibrary = (props) => {
  const { playlist, history, isValidSession } = props;

  const onRemoveClick = (track) => {
    props.dispatch(removeFromList(track));
  };

  console.log(playlist);
  return (
    <>
      {isValidSession() ? (
        <>
          <Header page="my-library" history={history} />
          {Object.keys(playlist).length > 0 && (
            <>
              <h2>My Playlist</h2>
              <div className="albums">
                {playlist.items.map((track, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Card style={{ width: "18rem" }}>
                        <a
                          target="_blank"
                          href={track.external_urls.spotify}
                          rel="noopener noreferrer"
                          className="card-image-link"
                        >
                          <Card.Img
                            variant="top"
                            src={
                              !_.isEmpty(track.album.images)
                                ? track.album.images[0].url
                                : "https://i.imgur.com/nszu54A.jpg"
                            }
                            alt=""
                          />
                        </a>
                        <Card.Body>
                          <Card.Title>{track.name}</Card.Title>
                        </Card.Body>
                        <Button
                          variant="danger"
                          onClick={() => onRemoveClick(track.id)}
                        >
                          - Remove
                        </Button>
                      </Card>
                    </React.Fragment>
                  );
                })}
              </div>
            </>
          )}
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
    artists: state.artists,
    playlist: state.playlist,
  };
};

export default connect(mapStateToProps)(MyLibrary);
