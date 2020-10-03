import React, { useEffect, useContext } from "react";
import Markdown from "react-markdown";
import db from "../firebase";
import { navigate } from "@reach/router";

import { DocumentContext } from "../contexts/DocumentContext";

import Loading from "../components/Loading";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Editor = ({ id }) => {
  const { setDocument, text, setText, updatedAt } = useContext(DocumentContext);
  console.log("Here", text);

  useEffect(() => {
    console.log("Rerender");
    const ref = db.collection("posts").doc(id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const { title, text, updatedAt } = data;
        // setDocument({ id, title: title || "", text: text || "", updatedAt });
      } else {
        navigate("/404");
      }
    });
  }, [id, setDocument]);

  function handleTextChange(value) {
    if (text !== value) {
      console.log(text, value);
      setText(value);
    }
  }

  if (!updatedAt) {
    return <Loading />;
  }

  return (
    <>
      <Header id={id} />
      <div id="editor">
        <textarea
          id="input"
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          rows="10"
        ></textarea>
        <div id="output">
          <Markdown source={text} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Editor;
