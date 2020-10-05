/*********************************
 * Update post on firebase
 *********************************/
import db from "../../src/firebase";

module.exports = async (req, res) => {
  const { id, title, text, publicId } = req.query;

  const ref = await db.collection("posts").doc(id);

  ref
    .set({
      title,
      text,
      publicId,
      updatedAt: new Date(),
    })
    .then(() => {
      return res.json({
        msg: "Updated succsessfully",
      });
    })
    .catch((error) => {
      return res.status(404).json({
        error: 404,
        msg: "There was an error updating.",
      });
    });
};
