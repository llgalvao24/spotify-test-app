import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container d-flex align-items-center">
      <img
        src="https://image.freepik.com/free-vector/error-404-found-glitch-effect_8024-4.jpg"
        alt="Spotify logo"
      />
      <h1>
        Go to <Link to="/home">Home Page</Link>
      </h1>
    </div>
  );
};

export default NotFoundPage;
