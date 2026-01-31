import buildPitsbyExamples from "../../pattern-library/setup-nunjucks/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "Location Info",
  description:
    "Location info component shows information about a specific location.",
  properties: [
    {
      name: "filename",
      type: "String",
      values: "filename.pdf",
      required: true,
    },
    {
      name: "address",
      type: "String",
      values: "123 Main St, Anytown, AT 12345",
      required: true,
    },
    {
      name: "easting",
      type: "String",
      values: "123456",
      required: true,
    },
    {
      name: "northing",
      type: "String",
      values: "654321",
      required: true,
    },
    {
      name: "lat",
      type: "String",
      values: "51.5074",
      required: true,
    },
    {
      name: "lng",
      type: "String",
      values: "0.1278",
      required: true,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
