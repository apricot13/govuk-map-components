import type { Docs } from "./types";

import components from "../components/docs";
import filters from "../nunjucks/filters/docs";

// Export as a single object
const documentation: Docs = {
  components,
  filters,
};

export default documentation;
