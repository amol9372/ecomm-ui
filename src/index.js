import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./utils/history";
import { getConfig } from "./config";
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { AuthTokenProvider } from "./components/authTokenContext";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

// Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
// for a full list of the available properties on the provider
const config = getConfig();

const providerConfig = {
  domain: process.env.REACT_APP_AUTH0_ISSUER_BASE_URL,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(process.env.REACT_APP_AUTH0_AUDIENCE
      ? { audience: process.env.REACT_APP_AUTH0_AUDIENCE }
      : null),
    // ...(process.env.AUTH0_AUDIENCE
    //   ? { audience: process.env.AUTH0_AUDIENCE }
    //   : null),
  },
};

const root = createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider {...providerConfig}>
    <ChakraProvider resetCSS theme={theme}>
      <App />
    </ChakraProvider>
  </Auth0Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
