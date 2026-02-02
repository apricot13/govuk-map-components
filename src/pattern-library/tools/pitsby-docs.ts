import docs from "../docs";
import chokidar from "chokidar";
import path from "path";
import type { DocumentationName, DocumentationType } from "../types";
import { writeFile, mkdir, unlink, access } from "fs/promises";
import { fileURLToPath } from "url";

/**
 * Absolute path to the current file.
 * @constant
 */
const __filename = fileURLToPath(import.meta.url);
/**
 * Absolute path to the current directory.
 * @constant
 */
const __dirname = path.dirname(__filename);

/**
 * File extension for documentation TypeScript files.
 * @constant
 */
const DOC_TS_EXT = ".doc.ts";
/**
 * Suffix to strip from base filename.
 * @constant
 */
const DOC_SUFFIX = ".doc";
/**
 * Output directory for generated Pitsby documentation files.
 * @constant
 */
const OUTPUT_DIR = path.resolve(__dirname, "../../../pitsbyDocs");

/**
 * Maps documentation types to their source directory paths.
 * @constant
 */
const documentationTypeMap: Record<DocumentationType, string> = {
  components: "src/components",
  filters: "src/nunjucks/filters",
};

/**
 * Returns the output path for a given documentation filename.
 * @param {string} filename - The base filename (without extension)
 * @returns {string} The absolute path to the output .doc.cjs file
 */
const getDocOutPath = (filename: string): string =>
  path.join(OUTPUT_DIR, `${filename}.doc.cjs`);

/**
 * Ensures a directory exists, creating it recursively if needed.
 * @param {string} dir - The directory path
 * @returns {Promise<void>}
 */
const ensureDirExists = async (dir: string): Promise<void> => {
  try {
    await access(dir);
  } catch {
    await mkdir(dir, { recursive: true });
  }
};

/**
 * Extracts the base name from a file path, removing the .doc suffix if present.
 * @param {string} filePath - The file path
 * @returns {string} The base name without .doc
 */
const extractBaseName = (filePath: string): string => {
  const name = path.parse(filePath).name;
  return name.endsWith(DOC_SUFFIX) ? name.slice(0, -DOC_SUFFIX.length) : name;
};

/**
 * Determines the documentation type based on the directory path.
 * @param {string} dir - The directory path
 * @returns {DocumentationType | null} The documentation type, or null if not found
 */
const getDocumentationType = (dir: string): DocumentationType | null => {
  const normalizedDir = dir.split(path.sep).join(path.posix.sep);
  for (const [key, docDir] of Object.entries(documentationTypeMap)) {
    if (normalizedDir.includes(docDir.split(path.sep).join(path.posix.sep))) {
      return key as DocumentationType;
    }
  }
  return null;
};

/**
 * Creates or updates a Pitsby documentation .doc.cjs file for a given component/filter.
 * @param {DocumentationName} filename - The base filename (without .doc)
 * @param {DocumentationType} documentationType - The type of documentation (component/filter)
 * @returns {Promise<void>}
 */
const createPitsbyDocumentationFile = async (
  filename: DocumentationName,
  documentationType: DocumentationType
): Promise<void> => {
  const doc = docs[documentationType]?.[filename];
  if (!doc) {
    console.warn(`No documentation found for ${documentationType}/${filename}`);
    return;
  }
  const documentation = {
    ...doc,
    name: documentationType === "filters" ? `Filter: ${doc.name}` : doc.name,
  };
  await ensureDirExists(OUTPUT_DIR);
  const content = `module.exports = ${JSON.stringify(documentation, null, 2)};`;
  await writeFile(getDocOutPath(filename), content, "utf8");
  console.log(`Wrote documentation file: ${getDocOutPath(filename)}`);
};

/**
 * Handles removal of a .doc.ts file by deleting the corresponding .doc.cjs file.
 * @param {string} filePath - The path to the removed .doc.ts file
 * @returns {Promise<void>}
 */
const handleRemove = async (filePath: string): Promise<void> => {
  if (!filePath.endsWith(DOC_TS_EXT)) return;
  const filename = extractBaseName(filePath);
  const outPath = getDocOutPath(filename);
  try {
    await unlink(outPath);
    console.log(`Removed documentation file: ${outPath}`);
  } catch {
    console.log(`Documentation file not found for removal: ${outPath}`);
  }
};

/**
 * Handles addition or change of a .doc.ts file by generating/updating the .doc.cjs file.
 * @param {string} filePath - The path to the changed/added .doc.ts file
 * @returns {Promise<void>}
 */
const handleChangeOrUpdate = async (filePath: string): Promise<void> => {
  if (!filePath.endsWith(DOC_TS_EXT)) return;
  const parsed = path.parse(filePath);
  const baseName = extractBaseName(filePath);
  const documentationType = getDocumentationType(parsed.dir);
  if (!documentationType) {
    console.warn(`Could not determine documentation type for: ${filePath}`);
    return;
  }
  await createPitsbyDocumentationFile(baseName, documentationType);
};

/**
 * Builds documentation files for all entries in the docs object.
 * @returns {Promise<void>}
 */
const buildAllPitsbyDocumentationFiles = async (): Promise<void> => {
  for (const documentationType of Object.keys(docs) as DocumentationType[]) {
    const entries = docs[documentationType];
    for (const filename of Object.keys(entries)) {
      await createPitsbyDocumentationFile(filename, documentationType);
    }
  }
};

/**
 * Runs the script in either watch mode or build mode, depending on CLI argument.
 */
const main = async () => {
  const mode = process.argv[2];
  if (mode === "build") {
    console.log("Building all documentation files...");
    await buildAllPitsbyDocumentationFiles();
    console.log("Build complete.");
  } else {
    // Default: watch mode
    chokidar
      .watch("./src", {
        persistent: true,
        ignoreInitial: true,
        // @TODO build when a file other than .doc.ts is edited
        ignored: (filePath, stats) =>
          stats?.isFile() ? !filePath.endsWith(DOC_TS_EXT) : false,
      })
      .on("add", handleChangeOrUpdate)
      .on("change", handleChangeOrUpdate)
      .on("unlink", handleRemove);

    console.log("Watching for *.doc.ts changes...");
  }
};

main();
