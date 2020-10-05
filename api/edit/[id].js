/*********************************
 * Show post from firebase
 *********************************/
import db from "../../src/firebase";

module.exports = async (req, res) => {
  const { id } = req.query;

  const ref = await db.collection("posts").doc(id);

  const results = await ref.get();

  if (results.exists) {
    const data = results.data();
    const { publicId, title, text, updatedAt } = data;

    return res.json({
      id,
      publicId,
      title: title || "",
      text: text || "",
      updatedAt,
    });
  } else {
    return res.status(404).json({
      error: 404,
      msg: "Not found!",
    });
  }
};
