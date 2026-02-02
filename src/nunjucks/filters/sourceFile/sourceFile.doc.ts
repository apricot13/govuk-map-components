import buildPitsbyExamples from "../../../pattern-library/documentation/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "sourceFile",
  description: "Converts localstack to localhost in a given URL string.",
  properties: [],
  examples: buildPitsbyExamples(__dirname),
};
