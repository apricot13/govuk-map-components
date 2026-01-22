module.exports = {
  name: "Title",
  description: "Component that displays a title with optional caption and tag.",
  properties: [
    {
      name: "title",
      type: "String",
      values: "Title text",
      required: false,
    },
    {
      name: "caption",
      type: "String",
      values: "filename.pdf",
      required: false,
    },
    {
      name: "tag",
      type: "String",
      values: "Document or data type",
      required: false,
    },
  ],
  examples: [
    {
      title: "Just title",
      description: "This is just a page title without caption or tag.",
      template: `
        <div class="title-component">
          <h1>
            <span class="govuk-heading-xl">Title text</span>
          </h1>
        </div>`,
    },
    {
      title: "Title and caption",
      description:
        "This is a page title with a caption. Caption is usually the file name or the job description.",
      template: `  
        <div class="title-component">
          <h1>
            <span class="govuk-caption-xl">filename.pdf</span>
            <span class="govuk-heading-xl">Title text</span>
          </h1>
        </div>`,
    },
    {
      title: "Full title with caption and tag",
      description: "An example of the MyBox component within a paragraph.",
      template: `  
        <div class="title-component">
          <strong class="govuk-tag govuk-tag--grey">tag</strong>
          <h1>
            <span class="govuk-caption-xl">filename.pdf</span>
            <span class="govuk-heading-xl">Title text</span>
          </h1>
        </div>`,
    },
  ],
};
