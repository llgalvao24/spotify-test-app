import React from "react";
import PropTypes from "prop-types";
import { Table, Image, Button } from "react-bootstrap";
import _ from "lodash";

const TrackList = (props) => {
  const { tracks } = props;

  const milisecToMin = (milisecs) => {
    const minutes = Math.floor(milisecs / 60000);
    const seconds = ((milisecs % 60000) / 1000).toFixed(0);

    //If seconds is less than 10 put a zero in front.
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const albumArtData = (images) => {
    return _.isEmpty(images) ? (
      <td>
        <Image
          roundedCircle
          alt="album art"
          width="50"
          height="50"
          src="https://i.imgur.com/nszu54A.jpg"
        />
      </td>
    ) : (
        <td>
          <Image
            roundedCircle
            alt="album art"
            width="50"
            height="50"
            src={images[0].url}
          />
        </td>
      );
  };

  // eslint-disable-next-line no-unused-vars
  const removeAddButton = (track) => {
    return (
      <>
        {props.onAddClick ? (
          <Button variant="success" onClick={() => props.onAddClick(track)}>
            +
          </Button>
        ) : null}
        {props.onRemoveClick ? (
          <Button
            variant="danger"
            onClick={() => props.onRemoveClick(track.id)}
          >
            -
          </Button>
        ) : null}
      </>
    );
  };

  return (
    <>
      {Object.keys(tracks).length > 0 && (
        <Table responsive hover>
          <tbody>
            {tracks.items.map((track, index) => {
              return (
                <tr key={index}>
                  {albumArtData(track?.album?.images)}
                  <td className="align-middle">{track.name}</td>
                  <td className="align-middle">{track?.album?.name}</td>
                  <td className="align-middle">
                    {milisecToMin(track.duration_ms)}
                  </td>
                  <td className="align-middle">{removeAddButton(track)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.shape().isRequired,
  onAddClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};

export default TrackList;
