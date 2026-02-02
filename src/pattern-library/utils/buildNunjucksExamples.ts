import docs from "../../docs";
import type { Documentation, Docs } from "../types";
import pitsbyDocToNunjucksDoc from "./pitsbyDocToNunjucksDoc";

/**
 * Builds the NunjucksDocumentation structure from the imported Pitsby docs.
 *
 * Converts the { components, filters } arrays of PitsbyDocumentation objects
 * into the { components, filters } arrays of NunjucksDocumentation objects,
 * using the pitsbyDocToNunjucksDoc mapping function.
 *
 * @returns {Documentation} An object containing arrays of NunjucksDocumentation for components and filters.
 *
 * @example
 * const docs = buildNunjucksExamples();
 * // docs.components and docs.filters are arrays of NunjucksDocumentation
 */
const buildNunjucksExamples = (): Documentation => {
  const { components, filters } = docs as Docs;

  return {
    components: components.map(pitsbyDocToNunjucksDoc),
    filters: filters.map(pitsbyDocToNunjucksDoc),
  };
};

export default buildNunjucksExamples;
