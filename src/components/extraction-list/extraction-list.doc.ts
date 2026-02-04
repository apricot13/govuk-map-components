import buildPitsbyExamples from "../../pattern-library/utils/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "Extraction list",
  description: "Table showing a list of extractions the user has created.",
  properties: [
    {
      name: "jobPath",
      type: "String",
      values: "Path to extraction jobs",
      required: true,
    },
    {
      name: "jobs",
      type: "Jobs array",
      values: [
        {
          id: "test-job--status--in-progress",
          title: "TPO_33_02.pdf",
          job_type: "treepreservationorder",
          status: "in_progress",
          created_datetime: "2025-11-14 04:11:09.820132+00",
        },
      ],
      required: true,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
