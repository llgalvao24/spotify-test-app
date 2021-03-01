import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/Header.css";
import { Link } from "react-router-dom";
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
      .catch((error) => console.log(error, "user info request error"));
  }, []);

  const logout = () => {
    localStorage.removeItem("params");
    localStorage.removeItem("expiration_time");
    history.push("/");
    history.go(0);
  };

  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand as={Link} to="/home">
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
            as={Link}
            to={`/${page === "home" ? "my-library" : "home"}`}
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

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
  }).isRequired,
  handleSearch: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
};

export default Header;
