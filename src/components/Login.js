import React from "react";
import "../styles/Login.css";
import { connect } from "react-redux";

const {
  REACT_APP_CLIENT_ID,
  REACT_APP_AUTHORIZE_URL,
  REACT_APP_REDIRECT_URL,
} = process.env;

function Login() {
  return (
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
  );
}

export default connect()(Login);
