import buildPitsbyExamples from "../../../pattern-library/documentation/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "Date",
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
