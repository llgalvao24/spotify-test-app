import { useEffect } from "react";
import _ from "lodash";
import { getUrlParamValues } from "../configuration/auth-handler";

const RedirectPage = (props) => {
  const { history, location } = props;

  useEffect(() => {
    try {
      if (_.isEmpty(location.hash)) {
        return history.push("/home");
      }

      const accessToken = getUrlParamValues(location.hash);
      const expirationTime = new Date().getTime() + accessToken.expires_in * 10;
      localStorage.setItem("params", JSON.stringify(accessToken));
      localStorage.setItem("expiration_time", expirationTime);
      history.push("/home");
    } catch (error) {
      history.push("/");
    }
  }, []);

  return null;
};

export default RedirectPage;
