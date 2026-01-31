import * as fs from "fs";
import * as path from "path";
import * as pitsbyDocs from "./../../docs";

interface PitsbyDocumentation {
  name: string;
  description: string;
  properties: Record<string, unknown>[];
  examples?: PitsbyExample[];
  visible?: boolean;
  id?: string;
}

interface PitsbyExample {
  title: string;
  template: string;
  name?: string;
  description?: string;
  visible?: boolean;
}

interface NunjucksDocumentation {
  name: string;
  description: string;
  id: string;
  visible: boolean;
  examples?: NunjucksDocumentation[];
}

const getDocFiles = (dir: string): string[] => {
  let results: string[] = [];

  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getDocFiles(fullPath));
    } else if (entry.endsWith(".doc.ts")) {
      results.push(fullPath);
    }
  }

  return results;
};

const buildComponentExamples = (examples: PitsbyExample[]) => {
  const examplesList: NunjucksDocumentation[] = [];
  examples.forEach((ex: PitsbyExample) => {
    const example: NunjucksDocumentation = {
      name: ex.title || ex.name || "Example",
      description: ex.description || "",
      id:
        ex.title?.toLowerCase().replace(/\s+/g, "-") ||
        ex.name?.toLowerCase().replace(/\s+/g, "-") ||
        "example",
      visible: ex.visible !== false,
    };
    examplesList.push(example);
  });
  return examplesList;
};

const buildComponentDocs = (docs: string[]): NunjucksDocumentation[] => {
  const obj: NunjucksDocumentation[] = [];
  docs.forEach(async file => {
    const id: string = path.basename(file, ".doc.ts");
    const doc = (
      pitsbyDocs as Record<string, { default: PitsbyDocumentation }>
    )[id].default;

    const item: NunjucksDocumentation = {
      name: doc.name || path.basename(file, ".doc.ts"),
      description: doc.description || "",
      id: path.basename(file, ".doc.ts"),
      visible: doc.visible !== false,
    };

    if (doc.examples && Array.isArray(doc.examples)) {
      if (doc.examples.length > 1) {
        item.examples = buildComponentExamples(doc.examples);
      }
    }

    obj.push(item);
  });

  return obj;
};

const buildNunjucksExamples = () => {
  const componentDocs = getDocFiles(
    path.resolve(process.cwd(), "src/components")
  );
  const filterDocs = getDocFiles(
    path.resolve(process.cwd(), "src/nunjucks/filters")
  );

  const components: NunjucksDocumentation[] = buildComponentDocs(componentDocs);
  const filters: NunjucksDocumentation[] = buildComponentDocs(filterDocs);

  return {
    components,
    filters,
  };
};

export default buildNunjucksExamples;
