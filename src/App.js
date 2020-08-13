import React, { useState } from "react";
import "./assets/styles/Style.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Editor from "./components/Editor";

const App = () => {
  const [text, setText] = useState("# سلام دنیا");

  return (
    <div id="app">
      <Header text={text} />
      <Editor text={text} setText={setText} />
      <Footer text={text} />
    </div>
  );
};

export default App;
