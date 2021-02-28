/* eslint-disable react/prop-types */
import "../styles/Home.css";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Search from "../components/Search";
import TrackList from "../components/TrackList";
import Loading from "../components/Loading";
import {
  initiateGetResult,
  initialReleases,
  removeFromList,
} from "../actions/result";
import { get } from "../configuration/api";
import NewReleases from "./NewReleases";
import { addToList } from "../actions/result";

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [userName, setUserName] = useState("");

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

  const logout = () => {
    localStorage.removeItem("params");
    localStorage.removeItem("expiration_time");
    history.push("/");
    history.go(0);
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

  useEffect(() => {
    get("https://api.spotify.com/v1/me")
      .then((resp) => {
        setImageUrl(resp.images[0].url);
        setUserName(resp.display_name);
      })
      .catch(console.log("some error"));
  }, []);

  const { tracks, artists, playlist } = props;

  return (
    <>
      {isValidSession() ? (
        <>
          <Loading show={isLoading}>Loading...</Loading>
          <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand href="/home">
              <Image
                roundedCircle
                alt="user profile"
                width="50"
                height="50"
                src={imageUrl}
              />
              {userName}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="m-auto">
                <Search handleSearch={handleSearch} />
              </Nav>
              <Nav>
                <Nav.Link href="/my-library" className="mr-5 ml-5">
                  My Library
                </Nav.Link>
                <Button type="submit" variant="success" onClick={logout}>
                  Logout
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <NewReleases albums={artists} />
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
    artists: state.artists,
    playlist: state.playlist,
  };
};

export default connect(mapStateToProps)(Home);
