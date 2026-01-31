import buildPitsbyExamples from "../../pattern-library/setup-nunjucks/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "Status checker",
  description: "Status checker component shows the status of a job or process.",
  properties: [
    {
      name: "status",
      type: "String",
      values: "completed",
      required: true,
    },
    {
      name: "id",
      type: "Integer",
      values: "10",
      required: true,
    },
    {
      name: "title",
      type: "String",
      values: "Job Title",
      required: true,
    },
    {
      name: "apiPath",
      type: "String",
      values: "/api/status",
      required: true,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
