import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import db from "../firebase";
import { navigate } from "@reach/router";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Viewer = ({ id }) => {
  const [text, setText] = useState("# سلام دنیا");

  useEffect(() => {
    const ref = db.collection("posts").where("id", "==", id);

    ref.get().then((results) => {
      if (!results.empty) {
        const data = results.docs[0].data();
        setText(data.text);
      } else {
        navigate("/404");
      }
    });
  }, [id]);

  return (
    <>
      <Header />
      <div id="viewer">
        <div id="output">
          <Markdown source={text} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Viewer;
