import React, { useContext } from "react";
import { downloadMd } from "../helpers";
import Logo from "../assets/images/logo.svg";
import { newPost } from "../helpers";

import { DocumentContext } from "../contexts/DocumentContext";

const Header = () => {
  const { document, setDocument } = useContext(DocumentContext);

  return (
    <header>
      <div className="right">
        <img src={Logo} alt="Neveshte" width="32" />
        <input
          type="text"
          value={document.title}
          onChange={(e) => setDocument({ ...document, title: e.target.value })}
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
          onClick={() => downloadMd(document.text)}
        >
          دریافت فایل MD
        </button>
      </div>
    </header>
  );
};

export default Header;
