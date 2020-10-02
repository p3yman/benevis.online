import React from "react";
import { downloadMd } from "../helpers";
import Logo from "../assets/images/logo.svg";
import db from "../firebase";
import { newPost } from "../helpers";

const Header = ({ id, title, setTitle, text, setUpdatedAt }) => {
  const handleUpdate = () => {
    setUpdatedAt(null);
    const updatedAt = new Date();
    const updateRef = db.collection("posts").doc(id);
    updateRef
      .set({
        title,
        text,
        updatedAt,
      })
      .then(() => {
        setUpdatedAt(Math.floor(updatedAt.getTime() / 1000));
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <header>
      <div className="right">
        <img src={Logo} alt="Neveshte" width="32" />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="left">
        <button
          className="button is-small is-warning"
          onClick={() => newPost()}
        >
          سند جدید
        </button>
        <button
          className="button is-small is-link"
          onClick={() => downloadMd(text)}
        >
          دریافت فایل MD
        </button>
        <button className="button is-small is-success" onClick={handleUpdate}>
          ذخیره
        </button>
      </div>
    </header>
  );
};
export default Header;
