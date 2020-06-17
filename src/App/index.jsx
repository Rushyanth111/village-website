import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppBar from "./AppBar";
import MenuBar from "./MenuBar";
import NewsContentLong from "./NewsContentLong";
import NewsContentShort from "./NewsContentShort";
import { Provider } from "react-redux";
import React from "react";
import { createStore } from "redux";
import { rootReducer } from "./Redux";

function MainApp() {
  const store = createStore(rootReducer);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppBar />
        <MenuBar />
        <Switch>
          <Route path="/" exact component={NewsContentShort} />
          <Route path="/schemeDetails" exact component={NewsContentLong} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default MainApp;
