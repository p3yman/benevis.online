import React, { useEffect, useContext } from "react";
import Markdown from "react-markdown";
import db from "../firebase";
import { navigate } from "@reach/router";

import { DocumentContext } from "../contexts/DocumentContext";

import Loading from "../components/Loading";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Editor = ({ id }) => {
  const { document, setDocument } = useContext(DocumentContext);

  useEffect(() => {
    const ref = db.collection("posts").doc(id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const { publicId, title, text, updatedAt } = data;
        console.log(data);
        setDocument({
          id,
          publicId,
          title: title || "",
          text: text || "",
          updatedAt,
        });
      } else {
        navigate("/404");
      }
    });
  }, [id, setDocument]);

  if (!document.updatedAt) {
    return <Loading />;
  }

  return (
    <>
      <Header id={id} />
      <div id="editor">
        <textarea
          id="input"
          value={document.text}
          onChange={(e) => setDocument({ ...document, text: e.target.value })}
          placeholder="متن..."
          rows="10"
        ></textarea>
        <div id="output">
          <Markdown source={document.text} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Editor;
