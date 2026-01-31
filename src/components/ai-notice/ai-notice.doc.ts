import buildPitsbyExamples from "../../pattern-library/setup-nunjucks/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "AI notice",
  description: "A generic AI notice informing users about the use of AI.",
  properties: [
    {
      name: "text",
      type: "String",
      values:
        "This service uses AI to extract planning data from documents. This may produce inacurate results. Please check all outputs before use.",
      required: false,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
