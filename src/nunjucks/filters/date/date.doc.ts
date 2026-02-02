import buildPitsbyExamples from "../../../pattern-library/utils/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "date",
  description: "Formats a date string into a specified format.",
  properties: [
    {
      name: "format",
      type: "String",
      values: "Title",
      required: true,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
