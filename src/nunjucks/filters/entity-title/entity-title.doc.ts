import buildPitsbyExamples from "../../../pattern-library/utils/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "entityTitle",
  description:
    "Returns the singular or plural title for a given entity type. Also returns the entity id as well.",
  properties: [
    {
      name: "type",
      type: "String",
      values: "Entity type code",
      required: true,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
