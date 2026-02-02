import buildPitsbyExamples from "../../pattern-library/utils/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "Entity tasks",
  description:
    "TODO Used after an extraction has been completed to show the user the tasks they need to complete to finalise their entity data.",
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
