// https://pitsby.com/documentation#config
module.exports = {
  projects: [
    {
      engine: "vanilla",
      collectDocsFrom: "./src/components/",
    },
  ],
  styles: [
    "./dist/frontend-components.css",
    "./node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css",
  ],
  scripts: [
    "./dist/frontend-components.es.js",
    "./dist/frontend-components.umd.js",
  ],
};
