import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/fa";
dayjs.locale("fa");

const Footer = ({ updatedAt }) => {
  let update = "در حال بروزرسانی...";
  if (updatedAt) {
    update = `آخرین بروزرسانی: ${dayjs
      .unix(updatedAt.seconds)
      .format("MMMM D, YYYY h:mm A")}`;
  }

  return (
    <footer>
      <div className="data">{update}</div>
    </footer>
  );
};
export default Footer;
