import React from "react";
import "./assets/styles/Style.scss";
import { Router } from "@reach/router";

import { DocumentContextProvider } from "./contexts/DocumentContext";

import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Viewer from "./pages/Viewer";
import Error from "./pages/Error";

const App = () => {
  return (
    <div id="app">
      <DocumentContextProvider>
        <Router>
          <Home path="/" />
          <Editor path="/e/:id" />
          <Viewer path="/v/:id" />
          <Error path="/404" />
        </Router>
      </DocumentContextProvider>
    </div>
  );
};

export default App;
