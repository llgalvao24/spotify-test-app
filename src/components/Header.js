/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Image, Navbar, Nav, Button } from "react-bootstrap";
import { get } from "../configuration/api";
import Search from "../components/Search";

const Header = (props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [userName, setUserName] = useState("");

  const { history, handleSearch, page } = props;

  useEffect(() => {
    get("https://api.spotify.com/v1/me")
      .then((resp) => {
        setImageUrl(resp.images[0].url);
        setUserName(resp.display_name);
      })
      .catch(console.log("some error"));
  }, []);

  const logout = () => {
    localStorage.removeItem("params");
    localStorage.removeItem("expiration_time");
    history.push("/");
    history.go(0);
  };

  return (
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
          {page === "home" ? (
            <Search handleSearch={handleSearch} />
          ) : (
              <h2>My Library</h2>
            )}
        </Nav>
        <Nav>
          <Nav.Link
            href={`/${page === "home" ? "my-library" : "home"}`}
            className="mr-5 ml-5"
          >
            {page === "home" ? "My Library" : "Search"}
          </Nav.Link>
          <Button type="submit" variant="success" onClick={logout}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
