import buildPitsbyExamples from "../../../pattern-library/documentation/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "filterBy",
  description: "Filters a collection based on a specified key and value.",
  properties: [
    {
      name: "key",
      type: "String",
      values: "Key to filter by",
      required: true,
    },
    {
      name: "value",
      type: "String",
      values: "Value to filter by",
      required: true,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
