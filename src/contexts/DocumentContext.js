import React, { createContext, useState, useEffect } from "react";
import db from "../firebase";

export const DocumentContext = createContext();

export const DocumentContextProvider = ({ children }) => {
  const [document, setDocument] = useState({
    id: null,
    publicId: null,
    title: "",
    text: "",
    updatedAt: null,
  });
  const [debounced, setDebounced] = useState(document);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounced(document);
    }, 2000);

    return () => clearTimeout(timerId);
  }, [document]);

  useEffect(() => {
    const update = () => {
      console.log("Updating!");
      setIsUpdating(true);
      const updateRef = db.collection("posts").doc(debounced.id);
      const { title, text, publicId } = debounced;
      updateRef
        .set({
          title,
          text,
          publicId,
          updatedAt: new Date(),
        })
        .then(() => {
          setIsUpdating(false);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    };

    if (debounced && debounced.id) {
      update();
    }
  }, [debounced]);

  const value = {
    document,
    setDocument,
    isUpdating,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};
