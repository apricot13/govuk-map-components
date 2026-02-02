import buildPitsbyExamples from "../../pattern-library/utils/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "PDF",
  description:
    "PDF component shows an embedded PDF document within the page. Options to toggle visibility.",
  properties: [
    {
      name: "title",
      type: "String",
      values: "Title",
      required: true,
    },
    {
      name: "url",
      type: "String",
      values: "https://example.com/document.pdf",
      required: true,
    },
    {
      name: "enableToggle",
      type: "String",
      values: "true",
      required: false,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
