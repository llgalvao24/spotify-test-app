/* eslint-disable react/prop-types */
import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Card from "react-bootstrap/Card";
import Header from "../components/Header";

const MyLibrary = (props) => {
  const { playlist, history, tracks } = props;
  console.log(playlist, tracks);
  return (
    <>
      <Header page="my-library" history={history} />
      {Object.keys(playlist).length > 0 && (
        <>
          <h2>New Releases</h2>
          <div className="albums">
            {playlist.items.map((album, index) => {
              return (
                <React.Fragment key={index}>
                  <Card style={{ width: "18rem" }}>
                    <a
                      target="_blank"
                      href={album.external_urls.spotify}
                      rel="noopener noreferrer"
                      className="card-image-link"
                    >
                      {!_.isEmpty(album.images) ? (
                        <Card.Img
                          variant="top"
                          src={album.images[0].url}
                          alt=""
                        />
                      ) : (
                          <img src="https://i.imgur.com/nszu54A.jpg" alt="" />
                        )}
                    </a>
                    <Card.Body>
                      <Card.Title>{album.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </React.Fragment>
              );
            })}
          </div>
        </>
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
