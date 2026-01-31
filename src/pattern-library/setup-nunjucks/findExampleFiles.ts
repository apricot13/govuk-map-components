import * as fs from "fs";
import * as path from "path";

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
