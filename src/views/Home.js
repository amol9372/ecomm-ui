import React, { Fragment, useEffect } from "react";

import Hero from "../components/ui/Hero";
import Content from "../components/Content";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { getAccessTokenSilently, getIdTokenClaims, user } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      try {
        const claims = await getIdTokenClaims();
        //console.log(claims.__raw);
        //const token = await getAccessTokenSilently();
        localStorage.setItem("token", claims.__raw);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("tokenType", "auth0");
      } catch (error) {
        console.error("Error getting the access token", error);
      }
    };

    getToken();
  }, [getAccessTokenSilently]);

  return (
    <Fragment>
      <Hero />
      <hr />
      <Content />
    </Fragment>
  );
};

export default Home;
