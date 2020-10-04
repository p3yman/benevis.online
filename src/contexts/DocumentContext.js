import React, { createContext, useState, useEffect } from "react";
import db from "../firebase";

export const DocumentContext = createContext();

export const DocumentContextProvider = ({ children }) => {
  const [doc, setDoc] = useState({
    id: null,
    publicId: null,
    title: "",
    text: "",
    updatedAt: null,
  });
  const [debounced, setDebounced] = useState(doc);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounced(doc);
    }, 2000);

    return () => clearTimeout(timerId);
  }, [doc]);

  useEffect(() => {
    const update = () => {
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

    if (debounced && debounced.id && !debounced.readOnly) {
      update();
    }
  }, [debounced]);

  const value = {
    doc,
    setDoc,
    isUpdating,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};
