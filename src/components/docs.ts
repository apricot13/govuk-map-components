import type { Docs } from "../pattern-library/types";
import aiNotice from "./ai-notice/ai-notice.doc";
import copyText from "./copy-text/copy-text.doc";
import entityTasks from "./entity-tasks/entity-tasks.doc";
import exampleComponent from "./example-component/example-component.doc";
import extractionList from "./extraction-list/extraction-list.doc";
import hero from "./hero/hero.doc";
import loadingSpinner from "./loading-spinner/loading-spinner.doc";
import locationInfo from "./location-info/location-info.doc";
import pdf from "./pdf/pdf.doc";
import simpleMap from "./simple-map/simple-map.doc";
import statusChecker from "./status-checker/status-checker.doc";
import title from "./title/title.doc";

const components: Docs["components"] = {
  "ai-notice": aiNotice,
  "copy-text": copyText,
  "entity-tasks": entityTasks,
  "example-component": exampleComponent,
  "extraction-list": extractionList,
  hero: hero,
  "loading-spinner": loadingSpinner,
  "location-info": locationInfo,
  pdf: pdf,
  "simple-map": simpleMap,
  "status-checker": statusChecker,
  title: title,
};

export default components;
