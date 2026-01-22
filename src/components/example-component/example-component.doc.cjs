module.exports = {
  name: "MyBox - Example component",
  description: "Example component that serves as a box element.",
  properties: [
    {
      name: "title",
      type: "String",
      values: "Example Title (default)",
      required: false,
    },
  ],
  examples: [
    {
      title: "Default",
      description: "An example of the MyBox component with default settings.",
      template: `<my-box></my-box>`,
    },
    {
      title: "Default",
      description: "An example of the MyBox component with a title.",
      template: `<p>title</p><my-box></my-box>`,
    },
  ],
};
