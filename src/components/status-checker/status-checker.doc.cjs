module.exports = {
  name: "StatusChecker - Status monitoring component",
  description: "Component that monitors and displays the status of a job.",
  properties: [
    {
      name: "job-id",
      type: "String",
      values: "1234",
      required: true,
    },
    {
      name: "job-title",
      type: "String",
      values: "Article 4 Direction",
      required: true,
    },
    {
      name: "api-path",
      type: "String",
      values: "/api/jobs",
      required: true,
    },
  ],
  examples: [
    {
      title: "With govuk tag (default)",
      description: "An example of the MyBox component with default settings.",
      template: `
        <status-checker job-id="1234" job-title="Article 4 Direction" api-path="http://localhost:8081/api/jobs">
          <strong class="govuk-tag govuk-tag--grey">queued</strong>
        </status-checker>`,
    },
    {
      title: "With paragraph",
      description: "An example of the MyBox component within a paragraph.",
      template: `<p>The current status is:
          <strong>
            <status-checker job-id="1234" job-title="Article 4 Direction" api-path="http://localhost:8081/api/jobs">
              queued
            </status-checker>
          </strong>
        </p>`,
    },
  ],
};
