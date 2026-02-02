import * as fs from "fs";
import * as path from "path";
import findExampleFiles from "../utils/findExampleFiles";
import createNunjucksEnvironment from "../utils/createNunjucksEnvironment";
import type { PitsbyExample } from "../types";

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
  // Create an object for each file found containing rendered template
  const result = files.map(file => {
    const html = fs.readFileSync(file, "utf-8");
    const template = env.renderString(html, {});
    // Use filename (without extension) as title
    const title = path.basename(file, ".njk");
    return { title, template };
  });
  return result;
};

export default buildPitsbyExamples;
