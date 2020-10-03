import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import db from "../firebase";
import { navigate } from "@reach/router";

import Header from "../components/Header";
import Loading from "../components/Loading";

const Viewer = ({ id }) => {
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const ref = db.collection("posts").where("publicId", "==", id);

    ref.get().then((results) => {
      if (!results.empty) {
        const data = results.docs[0].data();
        console.log(data);
        setDocument(data);
      } else {
        navigate("/404");
      }
    });
  }, [id]);

  if (!document) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div id="viewer">
        <div id="output">
          <Markdown source={document.text} />
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Viewer;
