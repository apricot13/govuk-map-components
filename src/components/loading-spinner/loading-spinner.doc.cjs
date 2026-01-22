module.exports = {
  name: "Loading spinner",
  description:
    "Component that shows a loading spinner while waiting for a process to complete.",
  properties: [
    {
      name: "fetch-url",
      type: "String",
      values:
        "http://localhost:8081/api/jobs/049fbea0-7614-44c9-9d0c-33957bee2fe3",
      required: true,
    },
  ],
  examples: [
    {
      title: "Loading",
      description: "An example of the Loading Spinner component while loading.",
      template: `
        <loading-spinner>
          <p class="govuk-body-l">
            Your PDF is being processed. This may take a few minutes.
            Please refresh the page to check the status.
          </p>
        </loading-spinner>`,
    },
    {
      title: "Loaded",
      description: "An example of the Loading Spinner component after loading.",
      template: `
        <loading-spinner fetch-url="http://localhost:8081/api/jobs/049fbea0-7614-44c9-9d0c-33957bee2fe3">
          <p class="govuk-body-l">
            Your PDF is being processed. This may take a few minutes.
            Please refresh the page to check the status.
          </p>
        </loading-spinner>`,
    },
  ],
};
