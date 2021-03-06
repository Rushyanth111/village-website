import "./app.css";
import "typeface-roboto";

import * as serviceWorker from "./serviceWorker";

import App from "./App";
import { CssBaseline } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <>
    <CssBaseline />
    <App />
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
