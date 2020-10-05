import React, { createContext, useState, useEffect } from "react";

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
      fetch(
        `/api/update/${debounced.id}?title=${debounced.title}&text=${debounced.text}&publicId=${debounced.publicId}`
      )
        .then((r) => (r.ok ? r.json() : Promise.reject(r)))
        .then((results) => {
          setIsUpdating(false);
        })
        .catch(() => {
          console.error("Error updating document.");
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
