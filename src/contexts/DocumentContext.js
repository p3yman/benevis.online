import React, { createContext, useState, useEffect } from "react";
import db from "../firebase";

export const DocumentContext = createContext();

export const DocumentContextProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [updatedAt, setUpdatedAt] = useState(null);
  const debouncedText = useDebounce(text, 1000);
  const debouncedTitle = useDebounce(title, 1000);

  useEffect(() => {
    console.log(debouncedText, debouncedTitle);
    if (id) {
      console.log("CHANGED!");
      setUpdatedAt(null);
      const updatedAt = new Date();
      const updateRef = db.collection("posts").doc(id);
      updateRef
        .set({
          debouncedTitle,
          debouncedText,
          updatedAt,
        })
        .then(() => {
          // setUpdatedAt(Math.floor(updatedAt.getTime() / 1000));
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  }, [debouncedText, debouncedTitle, id]);

  const setDocument = ({ id, title, text, updatedAt }) => {
    setId(id);
    setTitle(title);
    setText(text);
    setUpdatedAt(updatedAt);
  };

  const value = {
    id,
    setId,
    title,
    setTitle,
    text,
    setText,
    updatedAt,
    setUpdatedAt,
    setDocument,
  };

  return (
    <DocumentContext.Provider value={value}>
      {children}
    </DocumentContext.Provider>
  );
};

/**
 * Create debounce on a state
 * @param {*} value
 * @param {number} delay
 */
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
