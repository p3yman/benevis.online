import React from "react";

const Header = ({ text }) => {
  const download = () => {
    const blob = new Blob([text], { type: "text/plain" });

    const a = document.createElement("a");
    a.download = "file.md";
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = ["text/plain", a.download, a.href].join(":");
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
    }, 1500);
  };

  return (
    <header>
      Header
      <button onClick={download}>Download as md</button>
    </header>
  );
};
export default Header;
