import * as fs from "fs";
import * as path from "path";

/**
 * Finds example files in a directory.
 *
 * Looks for an `example.njk` file in the given directory and all `.njk` files
 * inside an `examples/` subdirectory.
 *
 * @param {string} dir - The directory to search for example files.
 * @returns {string[]} An array of absolute file paths to found example files.
 *
 * @example
 * // Returns all example files under 'src/components/button'
 * const files = findExampleFiles('src/components/button');
 */
const findExampleFiles = (dir: string): string[] => {
  // Find example.njk in dir
  const exampleFile = path.join(dir, "example.njk");
  let files: string[] = [];
  if (fs.existsSync(exampleFile)) {
    files.push(exampleFile);
  }
  // Find all examples/*.njk files
  const examplesDir = path.join(dir, "examples");
  if (fs.existsSync(examplesDir) && fs.statSync(examplesDir).isDirectory()) {
    const exampleFiles = fs
      .readdirSync(examplesDir)
      .filter(f => f.endsWith(".njk"))
      .map(f => path.join(examplesDir, f));
    files = files.concat(exampleFiles);
  }
  return files;
};

export default findExampleFiles;
