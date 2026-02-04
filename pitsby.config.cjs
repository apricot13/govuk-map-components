// https://pitsby.compilorama.com/documentation#config
module.exports = {
  projects: [
    {
      engine: "vanilla",
      collectDocsFrom: "./pitsbyDocs/",
    },
  ],
  styles: [
    "./dist/extract-frontend-components.css",
    "./dist/no-font-govuk.css",
  ],
  scripts: [
    { src: "./dist/extract-frontend-components.es.js", type: "module" },
    // "./dist/extract-frontend-components.umd.js",
  ],
  other: ["./dist/api/", "./dist/example-upload.pdf"],
};
