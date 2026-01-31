import * as path from "path";
import type { HmrContext, IndexHtmlTransformResult, Plugin } from "vite";
import buildNunjucksExamples from "./buildNunjucksExamples";
import setupNunjucks from "./setupNunjucks";

export default (): Plugin => {
  const env = setupNunjucks();
  const { components, filters } = buildNunjucksExamples();
  env.addGlobal("components", components);
  env.addGlobal("filters", filters);

  return {
    name: "nunjucks",
    enforce: "pre",
    // apply: "serve",
    handleHotUpdate: handleHotUpdate,
    transformIndexHtml: {
      order: "pre",
      handler: handleTransformIndexHtml,
    },
  };

  function handleTransformIndexHtml(
    html: string
  ):
    | IndexHtmlTransformResult
    | void
    | Promise<IndexHtmlTransformResult | void> {
    return new Promise((resolve, reject) => {
      env.renderString(html, {}, function (err, res) {
        if (err) {
          console.error(err);
          reject(err);
        } else if (res !== null) {
          resolve(res);
        } else {
          resolve(""); // resolves as void
        }
      });
    });
  }

  function handleHotUpdate(context: HmrContext): void | [] {
    const filename = path.resolve(context.file);
    if (!filename.endsWith(".html") && !filename.endsWith(".njk")) return;
    console.info(
      `Template file ${path.basename(filename)} has been changed. Sending full-reload.`
    );
    context.server.ws.send({ type: "full-reload" });
    return [];
  }
};
