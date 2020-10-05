import React, { useContext, useEffect } from "react";
import Markdown from "react-markdown";
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
    fetch(`/api/show/${id}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r)))
      .then((results) => {
        setDoc(results);
      })
      .catch(() => {
        navigate("/404");
      });
  }, [id, setDoc]);

  if (!doc.id) {
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
