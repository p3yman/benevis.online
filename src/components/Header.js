import React, { useContext } from "react";
import { Link } from "@reach/router";
import { downloadMd } from "../helpers";
import Logo from "../assets/images/logo.svg";

import { DocumentContext } from "../contexts/DocumentContext";

const Header = ({ viewer }) => {
  const { document, setDocument } = useContext(DocumentContext);

  return (
    <header>
      <div className="right">
        <img id="logo" src={Logo} alt="Neveshte" width="24" />

        {viewer ? (
          <h3 id="title">{document.title}</h3>
        ) : (
          <input
            id="title"
            type="text"
            value={document.title}
            placeholder="عنوان..."
            onChange={(e) =>
              setDocument({ ...document, title: e.target.value })
            }
          />
        )}
      </div>
      <div className="left">
        <Link className="button is-small is-warning" to="/">
          سند جدید
        </Link>
        <button
          className="button is-small is-success"
          onClick={() => downloadMd(document.text)}
        >
          دریافت فایل MD
        </button>
        {!viewer ? (
          <a
            className="button is-small is-link"
            href={`/v/${document.publicId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            لینک عمومی
          </a>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
