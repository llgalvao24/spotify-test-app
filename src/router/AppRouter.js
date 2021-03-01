import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../components/Login";
import Redirect from "../components/Redirect";

import NotFoundPage from "../components/NotFoundPage";
import Home from "../components/Home";
import MyLibrary from "../components/MyLibrary";

const AppRouter = () => {
  const [expirationTime, setExpirationTime] = useState("0");

  useEffect(() => {
    let expTime;
    try {
      expTime = JSON.parse(localStorage.getItem("expiration_time"));
    } catch (error) {
      expTime = "0";
    }
    setExpirationTime(expTime);
  }, []);

  const isValidSession = () => {
    return new Date().getTime() < expirationTime;
  };

  return (
    <BrowserRouter>
      <div className="main">
        <Switch>
          <Route
            path="/"
            exact={true}
            render={(props) => (
              <Login isValidSession={isValidSession} {...props} />
            )}
          />
          <Route
            path="/redirect"
            render={(props) => (
              <Redirect
                isValidSession={isValidSession}
                setExpirationTime={setExpirationTime}
                {...props}
              />
            )}
          />
          <Route
            path="/home"
            render={(props) => (
              <Home isValidSession={isValidSession} {...props} />
            )}
          />
          <Route
            path="/my-library"
            render={(props) => (
              <MyLibrary isValidSession={isValidSession} {...props} />
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;
