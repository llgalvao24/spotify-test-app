/* eslint-disable react/prop-types */
import React from "react";
import Card from "react-bootstrap/Card";
import _ from "lodash";

const NewReleases = ({ albums }) => {
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

export default NewReleases;
