import buildPitsbyExamples from "../../pattern-library/setup-nunjucks/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "Simple map",
  description:
    "Simple map component shows a simple map within the page. Options to toggle visibility.",
  properties: [
    {
      name: "title",
      type: "String",
      values: "Title",
      required: true,
    },
    {
      name: "zoom",
      type: "Integer",
      values: "10",
      required: true,
    },
    {
      name: "lat",
      type: "Integer",
      values: "51.505",
      required: true,
    },
    {
      name: "lng",
      type: "Integer",
      values: "-0.09",
      required: true,
    },
    {
      name: "enableToggle",
      type: "Boolean",
      values: "true",
      required: false,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
