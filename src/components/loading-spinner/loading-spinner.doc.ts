import buildPitsbyExamples from "../../pattern-library/setup-nunjucks/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "Loading Spinner",
  description:
    "Loading spinner component shows a loading state while content is being fetched or processed in the background.",
  properties: [
    {
      name: "fetchUrl",
      type: "String",
      values: "/api/job/12345",
      required: true,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
