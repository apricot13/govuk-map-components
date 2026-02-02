import type { Docs } from "./pattern-library/types";

// Import all component docs
import aiNotice from "./components/ai-notice/ai-notice.doc";
import copyText from "./components/copy-text/copy-text.doc";
import entityTasks from "./components/entity-tasks/entity-tasks.doc";
import exampleComponent from "./components/example-component/example-component.doc";
import extractionList from "./components/extraction-list/extraction-list.doc";
import hero from "./components/hero/hero.doc";
import loadingSpinner from "./components/loading-spinner/loading-spinner.doc";
import locationInfo from "./components/location-info/location-info.doc";
import pdf from "./components/pdf/pdf.doc";
import simpleMap from "./components/simple-map/simple-map.doc";
import statusChecker from "./components/status-checker/status-checker.doc";
import title from "./components/title/title.doc";

// Import all filter docs
import date from "./nunjucks/filters/date/date.doc";
import docType from "./nunjucks/filters/doc-type/docType.doc";
import entityTitle from "./nunjucks/filters/entity-title/entityTitle.doc";
import filterBy from "./nunjucks/filters/filter-by/filterBy.doc";
import sourceFile from "./nunjucks/filters/source-file/sourceFile.doc";

// Export as a single object
const documentation: Docs = {
  components: [
    aiNotice,
    copyText,
    entityTasks,
    exampleComponent,
    extractionList,
    hero,
    loadingSpinner,
    locationInfo,
    pdf,
    simpleMap,
    statusChecker,
    title,
  ],
  filters: [date, docType, entityTitle, filterBy, sourceFile],
};

export default documentation;
