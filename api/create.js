/*********************************
 * Create new post on firebase
 *********************************/
import db from "../src/firebase";
import { v4 as uuidv4 } from "uuid";

export default async (req, res) => {
  const ref = await db.collection("posts");
  ref
    .add({
      title: "بدون عنوان",
      text: "",
      updatedAt: new Date(),
      publicId: uuidv4(),
    })
    .then((docRef) => {
      return res.json({
        id: docRef.id,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        msg: "Error creating document.",
        error,
      });
    });
};
