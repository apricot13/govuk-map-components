import type { PitsbyDocumentation, NunjucksDocumentation } from "../types";
import { pascalToSentenceCase } from "../utils/pascalToSentenceCase";
import pitsbyExampleToNunjucksDoc from "../utils/pitsbyExampleToNunjucksDoc";
import { slugify } from "../utils/slugify";

/**
 * Converts a Pitsby documentation object to a Nunjucks documentation object.
 *
 * @param doc - The Pitsby documentation object to convert.
 * @returns The converted Nunjucks documentation object.
 */
function pitsbyDocToNunjucksDoc(
  doc: PitsbyDocumentation
): NunjucksDocumentation {
  return {
    name: doc.name,
    description: doc.description,
    id: doc.id || slugify(pascalToSentenceCase(doc.name)),
    visible: doc.visible !== false,
    examples: doc.examples?.map(pitsbyExampleToNunjucksDoc),
  };
}

export default pitsbyDocToNunjucksDoc;
