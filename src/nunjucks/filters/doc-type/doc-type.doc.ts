import buildPitsbyExamples from "../../../pattern-library/utils/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "docType",
  description: "Returns a human-readable document type based on a given code.",
  properties: [
    {
      name: "type",
      type: "String",
      values: "Document type code",
      required: true,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
