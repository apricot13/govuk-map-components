module.exports = {
  name: "MyBox - Example component",
  description: "Example component that serves as a box element.",
  properties: [
    {
      name: "latitude",
      type: "Number",
      values: "51.507351 (default)",
      required: true,
    },
  ],
  examples: [
    {
      title: "Default",
      description: "An example of the MyBox component with default settings.",
      template: `<my-box></my-box>`,
    },
  ],
};
