import * as fs from "fs";
import * as path from "path";
import findExampleFiles from "./findExampleFiles";
import createNunjucksEnvironment from "./createNunjucksEnvironment";
import type { PitsbyExample } from "../types";
import testData from "../../test-data";

/**
 * Builds rendered example templates from example files in a directory.
 *
 * Finds all Nunjucks example files (using {@link findExampleFiles}), renders them
 * with a Nunjucks environment, and returns an array of objects containing the
 * template title and rendered HTML.
 *
 * @param {string} dir - The directory to search for example files.
 * @returns {PitsbyExample[]} An array of objects with the example title and rendered template HTML.
 *
 * @example
 * const examples = buildPitsbyExamples('src/components/button');
 * // [{ title: 'example', template: '<div>...</div>' }, ...]
 */
const buildPitsbyExamples = (dir: string): PitsbyExample[] => {
  const files = findExampleFiles(dir);
  const env = createNunjucksEnvironment();
  Object.keys(testData || {}).forEach(key => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    env.addGlobal(`testData${key}`, (testData as Record<string, any>)[key]);
  });
  // Create an object for each file found containing rendered template
  const result = files.map(file => {
    const html = fs.readFileSync(file, "utf-8");
    const template = env.renderString(html, {});
    // Use filename (without extension) as title
    let title = path.basename(file, ".njk");
    title = title.slice(0, 1).toUpperCase() + title.slice(1);
    title = title.replace(/-/g, " ");
    return { title, template };
  });
  return result;
};

export default buildPitsbyExamples;
