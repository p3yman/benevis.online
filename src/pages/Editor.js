import React, { useEffect, useContext } from "react";
import Markdown from "react-markdown";
import db from "../firebase";
import { navigate } from "@reach/router";

import { DocumentContext } from "../contexts/DocumentContext";

import Loading from "../components/Loading";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Editor = ({ id }) => {
  const { doc, setDoc } = useContext(DocumentContext);

  useEffect(() => {
    const ref = db.collection("posts").doc(id);
    ref.get().then((firebaseDoc) => {
      if (firebaseDoc.exists) {
        const data = firebaseDoc.data();
        const { publicId, title, text, updatedAt } = data;
        setDoc({
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
  }, [id, setDoc]);

  if (!doc.updatedAt) {
    return <Loading />;
  }

  return (
    <>
      <Header id={id} />
      <div id="editor">
        <textarea
          id="input"
          value={doc.text}
          onChange={(e) => setDoc({ ...doc, text: e.target.value })}
          placeholder="متن..."
          rows="10"
        ></textarea>
        <div id="output">
          <Markdown source={doc.text} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Editor;
