# Frontend components

This folder contains reusable web components used across the Extract frontend application.

## Getting started

To get started developing components locally run `pnpm install` to install dependencies. (`corepack enable pnpm` may be required first if pnpm is not already enabled).

Run `pnpm run build` and then `pnpm run dev` to start local development servers for the components and documentation. This will start a Vite development server for the components library that watches for changes and rebuilds automatically, as well as a Pitsby development server for the documentation site. **In order to see updates to the docs when you make changes to the components you will need to run `pnpm run build` in a separate terminal to rebuild the components library.**

### Developing components

Run `pnpm run dev:dev` to start a local development server for the components library that watches for changes and rebuilds automatically.

### Developing documentation

Run `pnpm run docs:dev` to start a local development server for the documentation site that watches for changes in the `dist` folder and rebuilds the docs automatically. **To update the docs when you make changes to the components you will need to run `pnpm run build` in a separate terminal to rebuild the components library.**

## Building components

The following commands are available:

- `pnpm run dev` Run this to develop and test components and documentation locally (you will need to run `pnpm run build` in a separate terminal to update the docs when you make changes to the components)
- `pnpm run build` Build the components library for production use
- `pnpm run dev:dev` Run this to develop and test components locally
- `pnpm run docs:dev` Run this to develop the documentation site locally
- `pnpm run docs:build` Run this to build the documentation site for production use

## Structure of a component

The components follow the same pattern as the govuk frontend toolkit components. Each component has its own folder containing the following files:

- `_index.scss` - The main SCSS file for the component. Include this file if you're including it in your own SCSS build.
  Include any dependencies the component has, for example on govuk utilities or other govuk components. (govuk base is already included elsewhere so its not included here).

```scss
@import "./../node_modules/govuk-frontend/dist/govuk/base";
@import "./components/status-checker/index";
```

- `_component-name.scss` - The self contained SCSS file for the component itself. This will compile out to a standalone CSS file for the component so it includes the govuk base styles as well as any dependencies the component has.
- `macro.html` - The Nunjucks macro file for the component. This will be how you call the component in your own templates and follows the govuk frontend toolkit pattern.

```nunjucks
{% from 'govuk/components/button/macro.njk' import govukButton %}
{{ govukButton({
  text: 'Click me',
  classes: 'custom-class',
}) }}
```

- `template.html` - The Nunjucks template file for the component. This is where the HTML structure of the component is defined. You wont ever need to call this file directly as it will be called by the macro.
- `component-name.ts` - The TypeScript file for the component. This is where you define any interactivity for the component. If the component does not require any JavaScript then this file can be omitted.
- `component-name.doc.cjs` - This is the pitsby documentation file for the component. It uses CommonJS syntax so that Pitsby can read it. This is where you define the documentation for the component, including usage examples and any configuration options. This differs from the govuk frontend toolkit.
