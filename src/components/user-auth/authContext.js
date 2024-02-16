import React, { createContext, useState, useContext, useCallback } from "react";
import AuthService from "../../api/authService";
import { useToast } from "@chakra-ui/toast";
import StorageUtils from "../../utils/storageUtils";

const CustomAuthContext = createContext(null);

export const useCustomAuth = () => useContext(CustomAuthContext);

export const CustomAuthProvider = ({ children }) => {
  const toast = useToast();

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

          StorageUtils.saveData("token", res.data.token);
          StorageUtils.saveData("tokenType", "app");
          StorageUtils.saveData("user", JSON.stringify(res.data.userInfo)).then(
            (data) => {
              redirect();
            }
          );
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

  const redirect = () => {
    window.location.reload(false);
  };

  const appLogout = useCallback(() => {
    StorageUtils.clear();
    window.location.reload(false);
  }, []);

  const isAppUserAuthenticated = useCallback(async () => {
    return (await StorageUtils.loadData("user")) != null;
  }, []);

  const appUser = async () => {
    const user = await StorageUtils.loadData("user");
    return JSON.parse(user);
  };

  return (
    <CustomAuthContext.Provider
      value={{ appUser, appLogin, appLogout, isAppUserAuthenticated }}
    >
      {children}
    </CustomAuthContext.Provider>
  );
};
