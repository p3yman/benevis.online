import React, { useContext } from "react";
import moment from "moment-jalaali";
import GithubLogo from "../assets/images/github.svg";
import { DocumentContext } from "../contexts/DocumentContext";

// Config moment
moment.loadPersian({
  usePersianDigits: true,
});

const Footer = () => {
  const { document, isUpdating } = useContext(DocumentContext);

  let update = isUpdating
    ? "در حال بروزرسانی..."
    : `آخرین بروزرسانی: ${displayDate(document.updatedAt)}`;

  return (
    <footer>
      <div className="github">
        <a
          href="https://github.com/p3yman/benevis.online"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={GithubLogo} alt="Github Source" width="24" />
        </a>
      </div>
      <div className="data">{update}</div>
    </footer>
  );
};

function displayDate(value) {
  return moment(new Date(value.seconds * 1000)).format("jYYYY/jM/jD HH:mm:ss");
}

export default Footer;
