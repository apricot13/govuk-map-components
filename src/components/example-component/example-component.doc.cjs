module.exports = {
  name: "Example component",
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
      template: `<div class="example-component"><my-box></my-box></div>`,
    },
    {
      title: "Default",
      description: "An example of the MyBox component with a title.",
      template: `<div class="example-component"><p>title</p><my-box></my-box></div>`,
    },
  ],
};
