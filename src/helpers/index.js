import db from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { navigate } from "@reach/router";

/**
 * Download markdown with the passed text as contnet
 * @param {string} text
 */
export const downloadMd = (text, name = "neveshte") => {
  const blob = new Blob([text], { type: "text/plain" });

  const a = document.createElement("a");
  a.download = `${name}.md`;
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

/**
 * Create a new post
 */
export const newPost = () => {
  const ref = db.collection("posts");
  ref
    .add({
      title: "بدون عنوان",
      text: "",
      updatedAt: new Date(),
      id: uuidv4(),
    })
    .then((docRef) => {
      navigate(`/e/${docRef.id}`);
    })
    .catch((error) => {
      console.error("Error creating document: ", error);
    });
};
