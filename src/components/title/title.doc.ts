import buildPitsbyExamples from "../../pattern-library/documentation/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "Title",
  description:
    "Title component shows a title, caption and optional tag representing the current page data type tree, tree protection zone etc.",
  properties: [
    {
      name: "title",
      type: "String",
      values: "Title text",
      required: true,
    },
    {
      name: "caption",
      type: "String",
      values: "Caption text",
      required: true,
    },
    {
      name: "tag",
      type: "String",
      values: "Tag text",
      required: true,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
