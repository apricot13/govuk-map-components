import * as path from "path";
import type { HmrContext, IndexHtmlTransformResult, Plugin } from "vite";
import buildNunjucksExamples from "../utils/buildNunjucksExamples";
import createNunjucksEnvironment from "../utils/createNunjucksEnvironment";

/**
 * Vite plugin for Nunjucks template rendering and hot-reloading.
 *
 * - Sets up a Nunjucks environment with custom components and filters.
 * - Transforms index.html using Nunjucks during build and dev.
 * - Handles hot updates for .html and .njk files, triggering full reloads.
 *
 * @returns {Plugin} A Vite plugin object for Nunjucks integration.
 *
 * @example
 * // In vite.config.ts
 * import viteNunjucks from './src/pattern-library/plugins/viteNunjucks';
 * export default {
 *   plugins: [viteNunjucks()],
 * };
 */
export default (): Plugin => {
  const env = createNunjucksEnvironment();
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
