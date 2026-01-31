import * as fs from "fs";
import * as path from "path";
import findExampleFiles from "./findExampleFiles";
import setupNunjucks from "./setupNunjucks";

const buildPitsbyExamples = (dir: string) => {
  const files = findExampleFiles(dir);
  const env = setupNunjucks();

  // Create an object for each file found
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
