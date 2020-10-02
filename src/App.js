import React from "react";
import "./assets/styles/Style.scss";
import { Router } from "@reach/router";

import Home from "./components/Home";
import Editor from "./components/Editor";
import Viewer from "./components/Viewer";
import Error from "./components/Error";

const App = () => {
  return (
    <div id="app">
      <Router>
        <Home path="/" />
        <Editor path="/e/:id" />
        <Viewer path="/v/:id" />
        <Error path="/404" />
      </Router>
    </div>
  );
};

export default App;
