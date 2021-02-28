/* eslint-disable prettier/prettier */
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
import Result from "../components/Result";
import Loading from "../components/Loading";
import { initiateGetResult } from "../configuration/result";
import { get } from "../configuration/api";

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("tracks");
  const [imageUrl, setImageUrl] = useState("");
  const [userName, setUserName] = useState("");

  console.log(selectedCategory);

  const { isValidSession, history } = props;

  const handleSearch = (searchTerm) => {
    if (isValidSession()) {
      setIsLoading(true);
      props.dispatch(initiateGetResult(searchTerm)).then(() => {
        setIsLoading(false);
        setSelectedCategory("tracks");
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

  useEffect(() => {
    get("https://api.spotify.com/v1/me")
      .then((resp) => {
        console.log(resp);
        setImageUrl(resp.images[0].url);
        setUserName(resp.display_name);
      })
      .catch(console.log("some error"));
  }, []);

  const setCategory = (category) => {
    setSelectedCategory(category);
  };

  const { tracks } = props;
  const result = { tracks };

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
                <Nav.Link href="/my-library" className="mr-5">
                  My Library
                </Nav.Link>
                <Button type="submit" variant="success" className="ml-5">
                  Logout
                </Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Result
            result={result}
            setCategory={setCategory}
            selectedCategory={selectedCategory}
            isValidSession={isValidSession}
          />
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