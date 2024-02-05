import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthTokenContext = createContext(null);

export const AuthTokenProvider = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        setAuthToken(token);
        localStorage.setItem("token", token);
      } catch (error) {
        console.error("Error getting the access token", error);
      }
    };

    getToken();
  }, [getAccessTokenSilently]);

  return (
    <AuthTokenContext.Provider value={authToken}>
      {children}
    </AuthTokenContext.Provider>
  );
};

export const useAuthToken = () => useContext(AuthTokenContext);
