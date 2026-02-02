import buildPitsbyExamples from "../../pattern-library/utils/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "Extraction list",
  description: "TODO Table showing a list of extractions the user has created.",
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
