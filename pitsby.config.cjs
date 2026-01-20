// https://pitsby.com/documentation#config
module.exports = {
  projects: [
    {
      engine: "vanilla",
      collectDocsFrom: "./src/components/",
    },
  ],
  styles: ["./dist/frontend-components.css"],
  scripts: [
    "./dist/frontend-components.es.js",
    "./dist/frontend-components.umd.js",
  ],
};
