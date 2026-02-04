/// <reference types="vitest/config" />
import { defineConfig, LibraryFormats } from "vite";
import path from "path";
import nunjucks from "./src/pattern-library/plugins/viteNunjucks";

type LibTypes = "main" | "testData" | "nunjucks" | "noFontGovuk";

const LIB: LibTypes = (process.env.LIB as LibTypes) ?? "main";

const libConfig: Record<
  LibTypes,
  { entry: string; name: string; formats: LibraryFormats[]; slug: string }
> = {
  main: {
    entry: path.resolve(__dirname, "src/index.ts"),
    name: "FrontendComponents",
    formats: ["es", "umd"],
    slug: "extract-frontend-components",
  },
  noFontGovuk: {
    entry: path.resolve(__dirname, "src/no-font-govuk.ts"),
    name: "NoFontGovuk",
    formats: ["es", "umd"],
    slug: "no-font-govuk",
  },
  testData: {
    entry: path.resolve(__dirname, "src/test-data/index.ts"),
    name: "TestData",
    formats: ["es", "umd"],
    slug: "test-data",
  },
  nunjucks: {
    entry: path.resolve(__dirname, "src/nunjucks/index.ts"),
    name: "Nunjucks",
    formats: ["es", "umd"],
    slug: "nunjucks",
  },
};

const buildType: LibTypes = LIB;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nunjucks()],
  build: {
    emptyOutDir: false,
    sourcemap: buildType === "main" ? true : false,
    lib: {
      entry: libConfig[buildType].entry,
      name: libConfig[buildType].name,
      formats: libConfig[buildType].formats,
      fileName: format => `${libConfig[buildType].slug}.${format}.js`,
      cssFileName: libConfig[buildType].slug,
    },
    // rollupOptions: {
    //   // externalize deps that shouldn't be bundled
    //   // into your library
    //   external: ["govuk-frontend"],
    //   output: {
    //     // Provide global variables to use in the UMD build
    //     // for externalized deps
    //     globals: {
    //       "govuk-frontend": "govuk-frontend",
    //     },
    //   },
    // },
  },
  resolve: {
    alias: {
      "govuk-frontend": path.resolve(
        __dirname,
        "./node_modules/govuk-frontend"
      ),
    },
  },
  test: {
    projects: [
      {
        test: {
          include: ["**/*.{test,spec}.ts"],
          name: "unit",
          environment: "happy-dom",
          globals: true,
        },
      },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: [
          "slash-div",
          "if-function",
          "color-functions",
          "global-builtin",
          "import",
        ],
      },
    },
  },
});
