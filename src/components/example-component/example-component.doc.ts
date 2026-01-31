import buildPitsbyExamples from "../../pattern-library/setup-nunjucks/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "Example component",
  description:
    "An example component that demonstrates how to write a documentation file for a component.",
  properties: [
    {
      name: "title",
      type: "String",
      values: "Title",
      required: true,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
