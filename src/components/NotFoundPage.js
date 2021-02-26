import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h1>
        Page not found. Goto <Link to="/dashboard">Home Page</Link>
      </h1>
    </>
  );
};
export default NotFoundPage;
