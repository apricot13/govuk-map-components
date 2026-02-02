import type { PitsbyExample, NunjucksDocumentation } from "../types";
import { pascalToSentenceCase } from "../utils/pascalToSentenceCase";
import { slugify } from "../utils/slugify";

/**
 * Converts a PitsbyExample object to a NunjucksDocumentation object.
 *
 * @param example - The PitsbyExample to convert.
 * @returns The resulting NunjucksDocumentation object.
 */
function pitsbyExampleToNunjucksDoc(
  example: PitsbyExample
): NunjucksDocumentation {
  return {
    name: example.title || example.name || "Default Example",
    description: example.description || "",
    id: slugify(
      pascalToSentenceCase(example.title || example.name || "Default Example")
    ),
    visible: example.visible !== false,
  };
}

export default pitsbyExampleToNunjucksDoc;
