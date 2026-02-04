import type { Docs } from "../../pattern-library/types";

import date from "./date/date.doc";
import docType from "./doc-type/doc-type.doc";
import sourceFile from "./source-file/source-file.doc";
import entityTitle from "./entity-title/entity-title.doc";
import filterBy from "./filter-by/filter-by.doc";
import getTypeof from "./get-typeof/get-typeof.doc";

const filters: Docs["filters"] = {
  date,
  "doc-type": docType,
  "source-file": sourceFile,
  "entity-title": entityTitle,
  "filter-by": filterBy,
  "get-typeof": getTypeof,
};

export default filters;
