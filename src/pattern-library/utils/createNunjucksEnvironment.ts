import * as path from "path";
import nunjucks, { type Environment } from "nunjucks";
import * as filters from "../../nunjucks/filters";
import * as globals from "../../nunjucks/globals";

/**
 * Creates and configures a Nunjucks Environment with custom filters and globals.
 *
 * - Loads templates from the `src` directory and GOV.UK Frontend components.
 * - Adds all custom filters from `../../nunjucks/filters`.
 * - Adds all custom globals from `../../nunjucks/globals`.
 *
 * @returns {Environment} A configured Nunjucks Environment instance.
 *
 * @example
 * const env = createNunjucksEnvironment();
 * const output = env.renderString("Hello {{ name }}", { name: "World" });
 */
const createNunjucksEnvironment = (): Environment => {
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

export default createNunjucksEnvironment;
