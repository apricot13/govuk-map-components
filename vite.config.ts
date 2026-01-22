/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import path from "path";

// Main entry for the full bundle
const mainEntry = path.resolve(__dirname, "src/index.ts");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: mainEntry,
      name: "FrontendComponents",
      formats: ["es", "umd"],
      fileName: format => `frontend-components.${format}.js`,
      cssFileName: "frontend-components",
    },
    // rollupOptions: {
    //   // make sure to externalize deps that shouldn't be bundled
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
      },
    },
  },
});
