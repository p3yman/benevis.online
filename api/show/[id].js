/*********************************
 * Show post from firebase
 *********************************/
import db from "../../src/firebase";

export default async (req, res) => {
  const { id } = req.query;

  const ref = await db.collection("posts").where("publicId", "==", id);

  const results = await ref.get();

  if (!results.empty) {
    const data = results.docs[0].data();
    const { publicId, title, text, updatedAt } = data;

    return res.json({
      id,
      publicId,
      title: title || "",
      text: text || "",
      updatedAt,
      readOnly: true,
    });
  } else {
    return res.status(404).json({
      error: 404,
      msg: "Not found!",
    });
  }
};
