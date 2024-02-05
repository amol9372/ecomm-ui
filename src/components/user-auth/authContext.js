import React, { createContext, useState, useContext, useCallback } from "react";
import AuthService from "../../api/authService";
import { useToast } from "@chakra-ui/toast";
import { useHistory } from "react-router-dom";

const CustomAuthContext = createContext(null);

export const useCustomAuth = () => useContext(CustomAuthContext);

export const CustomAuthProvider = ({ children }) => {
  const toast = useToast();
  const history = useHistory();

  const appLogin = useCallback((username, password) => {
    const response = AuthService.authenticate({
      email: username,
      password: password,
    });

    response
      .then((res) => {
        console.log(res.data);

        if (res.status === 200) {
          toast({
            title: "Login successful.",
            description: "User is able to login.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.userInfo));
          localStorage.setItem("tokenType", "app");
          history.push("/home");
        } else {
          toast({
            title: "Authentication failed.",
            description: "Unable to login in the applciation",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const appLogout = useCallback(() => {
    localStorage.clear();
  }, []);

  const isAppUserAuthenticated = useCallback(() => {
    return localStorage.getItem("user") != null;
  }, []);

  const appUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  return (
    <CustomAuthContext.Provider
      value={{ appUser, appLogin, appLogout, isAppUserAuthenticated }}
    >
      {children}
    </CustomAuthContext.Provider>
  );
};
