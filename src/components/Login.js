import React from "react";
import PropTypes from "prop-types";
import "../styles/Login.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";

const {
  REACT_APP_CLIENT_ID,
  REACT_APP_AUTHORIZE_URL,
  REACT_APP_REDIRECT_URL,
} = process.env;

const Login = (props) => {
  const { isValidSession, location } = props;
  const { state } = location;
  const sessionExpired = state && state.session_expired;

  return (
    <>
      {isValidSession() ? (
        <Redirect to="/home" />
      ) : (
          <>
            {sessionExpired && (
              <Alert variant="danger" className="text-center">
                Session expired. Please login again.
              </Alert>
            )}
            <div className="login">
              <h2>Welcome to</h2>
              <img
                src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
                alt="Spotify logo"
              />
              <h2>Library manager</h2>
              <a
                href={`${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&response_type=token&show_dialog=true`}
              >
                LOGIN WITH SPOTIFY
            </a>
            </div>
          </>
        )}
    </>
  );
};

Login.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape().isRequired,
  }).isRequired,
  isValidSession: PropTypes.func.isRequired,
};

export default connect()(Login);
