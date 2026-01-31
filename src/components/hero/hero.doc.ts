import buildPitsbyExamples from "../../pattern-library/setup-nunjucks/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "Hero",
  description: "Hero component for landing pages.",
  properties: [
    {
      name: "title",
      type: "String",
      values: "Title",
      required: true,
    },
    {
      name: "lede",
      type: "String",
      values: "Lede",
      required: true,
    },
    {
      name: "feedbackHtml",
      type: "String",
      values: "Feedback HTML",
      required: true,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
