import buildPitsbyExamples from "../../pattern-library/documentation/buildPitsbyExamples";
const __dirname = new URL(".", import.meta.url).pathname;
export default {
  name: "Copy text",
  description:
    "Copy text component allows users to copy predefined text to their clipboard with a single click. It supports both styled and unstyled versions for flexible integration.",
  properties: [
    {
      name: "copyContent",
      type: "String",
      values: "This text is copied to clipboard when the button is clicked.",
      required: true,
    },
    {
      name: "label",
      type: "String",
      values: "Copy text to clipboard.",
      required: false,
    },
    {
      name: "feedback",
      type: "String",
      values: "Copied!",
      required: false,
    },
    {
      name: "feedback",
      type: "Boolean",
      values: true,
      required: false,
    },
    {
      name: "instructions",
      type: "String",
      values: "Copy",
      required: false,
    },
  ],
  examples: buildPitsbyExamples(__dirname),
};
