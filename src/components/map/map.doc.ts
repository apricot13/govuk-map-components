import buildPitsbyExamples from "../../pattern-library/utils/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "Map",
  description: "A map component that allows for editing.",
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
