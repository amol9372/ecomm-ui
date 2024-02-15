import React, { Fragment, useEffect, useState } from "react";

import Hero from "../components/ui/Hero";
import Content from "../components/Content";
import { useAuth0 } from "@auth0/auth0-react";
import { useCustomAuth } from "../components/user-auth/authContext";
import history from "../utils/history";
import MySocketComponent from "../events";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const { user, isLoading, error } = useAuth0();
  const { appUser } = useCustomAuth();

  useEffect(() => {
    const loggedUser = appUser() ? appUser() : user;
    if (loggedUser) {
      setLoggedInUser(loggedUser);
      history.push("/home");
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <Fragment>
      <Hero />
      <hr />
      <Content />
    </Fragment>
  );
};

export default Home;
