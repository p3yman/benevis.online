import React from "react";
import Markdown from "react-markdown";

const Editor = ({ text, setText }) => {
  return (
    <div id="editor">
      <textarea
        id="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="10"
      ></textarea>
      <div id="output">
        <Markdown source={text} />
      </div>
    </div>
  );
};

export default Editor;
