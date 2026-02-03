// https://pitsby.com/documentation#config
module.exports = {
  projects: [
    {
      engine: "vanilla",
      collectDocsFrom: "./pitsbyDocs/",
    },
  ],
  styles: [
    "./dist/frontend-components.css",
    "./node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.css",
  ],
  scripts: [
    { src: "./dist/frontend-components.es.js", type: "module" },
    // "./dist/frontend-components.umd.js",
  ],
};
