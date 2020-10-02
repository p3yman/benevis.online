import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import db from "../firebase";
import { navigate } from "@reach/router";

import Header from "./Header";
import Footer from "./Footer";

const Editor = ({ id }) => {
  const [updatedAt, setUpdatedAt] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const ref = db.collection("posts").doc(id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setTitle(data.title);
        setText(data.text);
        setUpdatedAt(data.updatedAt);
      } else {
        navigate("/404");
      }
    });
  }, [id]);

  return (
    <>
      <Header
        text={text}
        title={title}
        setTitle={setTitle}
        id={id}
        setUpdatedAt={setUpdatedAt}
      />
      <div id="editor">
        <textarea
          id="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="10"
        ></textarea>
        <div id="output">
          <Markdown source={text} />
        </div>
      </div>
      <Footer updatedAt={updatedAt} />
    </>
  );
};

export default Editor;
