import moment from "moment-jalaali";

/**
 * Download markdown with the passed text as contnet
 * @param {string} text
 */
export const downloadMd = (text, name) => {
  const blob = new Blob([text], { type: "text/plain" });

  const fileName =
    name || `benevis-online-${moment().format("YYYY-MM-DD--HH-mm-ss")}`;

  const a = document.createElement("a");
  a.download = `${fileName}.md`;
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
 * Converts English digits into farsi numbers
 *
 * @param digit
 * @param locale {string}
 * @returns {string}
 */
export const digits = (digit, locale = "en") => {
  const fa = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return `${digit}`.replace(/\d/g, (w) => fa[w]);
};
