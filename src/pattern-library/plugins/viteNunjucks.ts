import * as path from "path";
import type { HmrContext, IndexHtmlTransformResult, Plugin } from "vite";
import createNunjucksEnvironment from "../utils/createNunjucksEnvironment";
import docs from "../docs";
import pitsbyDocToNunjucksDoc from "../utils/pitsbyDocToNunjucksDoc";
import testData from "../../test-data";

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
  const components = Object.values(docs.components || {});
  const filters = Object.values(docs.filters || {});
  env.addGlobal("components", components.map(pitsbyDocToNunjucksDoc));
  env.addGlobal("filters", filters.map(pitsbyDocToNunjucksDoc));

  Object.keys(testData || {}).forEach(key => {
    // console.log(`Adding test data to Nunjucks env: testData${key}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    env.addGlobal(`testData${key}`, (testData as Record<string, any>)[key]);
  });

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
