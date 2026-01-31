import * as path from "path";
import nunjucks, { type Environment } from "nunjucks";
import * as filters from "../../nunjucks/filters";
import * as globals from "../../nunjucks/globals";

const setupNunjucks = () => {
  const env: Environment = nunjucks.configure(
    [
      path.resolve(process.cwd(), "src"),
      path.resolve(process.cwd(), "node_modules/govuk-frontend/dist/"),
    ],
    {
      noCache: true,
      dev: true,
      autoescape: true,
      trimBlocks: true,
      lstripBlocks: true,
    }
  );

  // Custom filters
  Object.keys(filters || {}).forEach(key => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    env.addFilter(key, (filters as Record<string, any>)[key]);
  });

  // Custom globals
  Object.keys(globals || {}).forEach(key => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    env.addGlobal(key, (globals as Record<string, any>)[key]);
  });
  return env;
};

export default setupNunjucks;
