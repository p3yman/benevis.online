import React, { useContext, useEffect } from "react";
import Markdown from "react-markdown";
import db from "../firebase";
import { navigate } from "@reach/router";

import { DocumentContext } from "../contexts/DocumentContext";

import Header from "../components/Header";
import Loading from "../components/Loading";

const Viewer = ({ id }) => {
  const { doc, setDoc } = useContext(DocumentContext);

  useEffect(() => {
    document.body.classList.add("viewer-page");

    return () => {
      document.body.classList.remove("viewer-page");
    };
  }, []);

  useEffect(() => {
    const ref = db.collection("posts").where("publicId", "==", id);

    ref.get().then((results) => {
      if (!results.empty) {
        const data = results.docs[0].data();
        const { publicId, title, text, updatedAt } = data;
        setDoc({
          id,
          publicId,
          title: title || "",
          text: text || "",
          updatedAt,
          readOnly: true,
        });
      } else {
        navigate("/404");
      }
    });
  }, [id, setDoc]);

  if (!doc) {
    return <Loading />;
  }

  return (
    <>
      <Header viewer={true} />
      <div id="viewer">
        <div id="output">
          <Markdown source={doc.text} />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Viewer;
