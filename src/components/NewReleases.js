import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Button } from "react-bootstrap";
import _ from "lodash";
import { addToList } from "../actions/result";

const NewReleases = (props) => {
  const { albums } = props;

  const onAddClick = (album) => {
    const track = {
      ...album.tracks.items[0],
      album: { images: album.images, name: album.name },
    };
    props.dispatch(addToList(track));
  };

  return (
    <>
      {Object.keys(albums).length > 0 && (
        <>
          <h2>New Releases</h2>
          <div className="albums">
            {albums.items.map((album, index) => {
              return (
                <React.Fragment key={index}>
                  <Card style={{ width: "18rem" }}>
                    <a
                      target="_blank"
                      href={album.external_urls.spotify}
                      rel="noopener noreferrer"
                      className="card-image-link"
                    >
                      <Card.Img
                        variant="top"
                        src={
                          !_.isEmpty(album.images)
                            ? album.images[0].url
                            : "https://i.imgur.com/nszu54A.jpg"
                        }
                        alt=""
                      />
                    </a>
                    <Card.Body>
                      <Card.Title>{album.tracks.items[0].name}</Card.Title>
                    </Card.Body>
                    <Button variant="success" onClick={() => onAddClick(album)}>
                      + Add to playlist
                    </Button>
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
    releases: state.releases,
  };
};

NewReleases.propTypes = {
  albums: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(NewReleases);
