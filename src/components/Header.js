import React from "react";
import { downloadMd } from "../helpers";
import Logo from "../assets/images/logo.svg";

const Header = ({ text, setText }) => {
  return (
    <header>
      <div className="right">
        <img src={Logo} alt="Neveshte" width="32" />
      </div>
      <div className="left">
        <button
          className="button is-small is-warning"
          onClick={() => setText("")}
        >
          سند جدید
        </button>
        <button
          className="button is-small is-link"
          onClick={() => downloadMd(text)}
        >
          دریافت فایل MD
        </button>
      </div>
    </header>
  );
};
export default Header;
