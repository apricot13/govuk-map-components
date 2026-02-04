import buildPitsbyExamples from "../../pattern-library/utils/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "Entity tasks",
  description:
    "Used after an extraction has been completed to show the user the tasks they need to complete to finalise their entity data.",
  properties: [
    {
      name: "entityType",
      type: "String",
      values: "tree, treepreservationorder etc",
      required: true,
    },
    {
      name: "entities",
      type: "Extracted objects or job metadata",
      values: [],
      required: true,
    },
    {
      name: "jobId",
      type: "String",
      values: "Job id",
      required: true,
    },
    {
      name: "entityId",
      type: "String",
      values:
        "Entity id, only required if the entity data is coming from the job metadata and not the extracted objects",
      required: false,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
