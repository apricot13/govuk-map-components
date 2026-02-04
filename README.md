# Frontend components

This folder contains reusable web components used across the Extract frontend application as well as other projects. The components are built using TypeScript, SCSS, and Nunjucks templates, following the design system guidelines provided by the UK Government Digital Service (GDS).

- `nunjucks` - This library contains the Nunjucks filter and globals for the components. This is what you would use to include the filters and globals in your own Nunjucks templates.
- `test-data` - This library contains test data for the components. This is what you would use to get example data for the components in your own tests.
- `no-font-govuk` - This library contains the gov-uk frontend CSS without the GDS font, in case you don't build your own styles in your project. It doesn't include the other assets and javascript though so you will need to install those separately.

## Getting started

### Nunjucks integration

#### Templates

To use the library in your project you will need to add the components to your nunjucks environment template paths and add the components javascript and styles to your project.

```js
nunjucks.configure([
  "./node_modules/extract-frontend-components/src",
  "YOUR-VIEWS-FOLDER",
]);
```

You can then use the components in your nunjucks templates like so:

NB the `{{ super() }}` calls in the example content blocks are required to ensure that any content defined in the component template is included in the final output.

**Default template:**

```nunjucks
{% extends "layouts/default.njk" %}
{% set pageName = "Page title" %}

{% from "components/title/macro.njk" import title %}

{% block content %}
  {{super()}}
  {{ title({title: pageName}) }}
{% endblock %}
```

**Hero template:**

```nunjucks
{% extends "layouts/hero.njk" %}
{% set pageName = "Page title" %}

{% from "components/title/macro.njk" import title %}
{% from "components/hero/macro.njk" import hero  %}

{% block header %}
  {{ super() }}
  {{ hero({title: "Example hero", lede: "Example caption", feedbackHtml: feedbackHtml}) }}
{% endblock %}

{% block content %}
  {{super()}}
  {{ title({title: pageName}) }}
{% endblock %}
```

#### Filters and Globals

This library also includes custom Nunjucks filters and globals that you can add to your Nunjucks environment like so:

```js
import { globals, filters } from "extract-frontend-components/nunjucks";

// Custom filters
Object.keys(filters).forEach(key => {
  eleventyConfig.addNunjucksFilter(key, filters[key]);
});
// Custom globals
Object.keys(globals).forEach(key => {
  eleventyConfig.addNunjucksGlobal(key, globals[key]);
});
```

### Including javascript and styles

To use the components javascript in your project, include the following script tag in your HTML:

```html
<script type="module" src="/extract-frontend-components.es.js"></script>
```

To use the components styles in your project, include the following link tag in your HTML:

```html
<link rel="stylesheet" href="/extract-frontend-components.css" />
```

### Govuk frontend toolkit

You will also need to include the govuk frontend toolkit templates, styles and javascript in your project. Instructions for doing this can be found in the [govuk-frontend documentation](https://frontend.design-system.service.gov.uk/)

### Test data

There is an optional export of test data for the components that can be used in your own tests. You can import the test data like so:

```js
import {
  jobFailed,
  jobInProgress,
  jobAwaitingStart,
  jobTreePreservationOrder,
  jobTreePreservationOrderSingleTree,
  jobTreePreservationOrderMultipleTrees,
  jobArticle4Direction,
  jobConservationArea,
} from "extract-frontend-components/test-data";
```

## Developing components

Run `npm run dev` to start a local development server for the components library that watches for changes and rebuilds automatically.

### Accessing test data

You can access the test-data in your component templates by adding the following to your nunjucks environment:

The data for these is set in the `src/pattern-library/plugins/viteNunjucks.ts` file.

```nunjucks
{{ testDatajobsManyExtractions }}
```

## Creating a new component

To get started run `cp -rp src/components/example-component src/components/your-new-component` to copy the example component to a new component folder and then rename the files and folders as appropriate.

All of the components should be built to be self contained, ie not relying on any global styles or javascript outside of the govuk frontend toolkit and this components library.

Ideally any `govuk-*`classes used in the component should be included in the component's own BEM styles so that the component can be used in any project without needing to include the govuk frontend toolkit styles globally.

The components follow the same pattern as the govuk frontend toolkit components. Each component's folder must be in slug case. Each component has its own folder containing the following files:

- `_index.scss` - The main SCSS file for the component. Include this file if you're including it in your own SCSS build.
  Include any dependencies the component has, for example on govuk utilities or other govuk components. (govuk base is already included elsewhere so its not included here).

```scss
@import "./../node_modules/govuk-frontend/dist/govuk/base";
@import "./components/status-checker/index";
```

- `_component-name.scss` - The self contained SCSS file for the component itself. This will compile out to a standalone CSS file for the component so it includes the govuk base styles as well as any dependencies the component has.
- `macro.njk` - The Nunjucks macro file for the component. This will be how you call the component in your own templates and follows the govuk frontend toolkit pattern.

```nunjucks
{% from 'govuk/components/button/macro.njk' import govukButton %}
{{ govukButton({
  text: 'Click me',
  classes: 'custom-class',
}) }}
```

- `template.njk` - The Nunjucks template file for the component. This is where the HTML structure of the component is defined. You wont ever need to call this file directly as it will be called by the macro.
- `component-name.ts` - The TypeScript file for the component. This is where you define any interactivity for the component. If the component does not require any JavaScript then this file can be omitted.
- `component-name.doc.ts` - This is the pitsby documentation file for the component. This is where you define the documentation for the component, including usage examples and any configuration options. This differs from the govuk frontend toolkit.
- `/examples` folder - This folder contains any use-cases `example-name.njk` for your component, you can add as many examples as you need.

## Develop with other projects locally

In order to set up this repository for development you will need to have Node.js and npm installed on your machine. You can then run `npm install` to install the dependencies for the project.

Then inside the extract-frontend-components root directory run the following command to link the package globally so that it can be used in other projects locally:

```
npm link
```

This will allow you to use the package in other projects by running `npm link extract-frontend-components` in the root directory of the other project.

When you make changes to the components you will need to rebuild the package by running `npm run build` in the extract-frontend-components root directory. This will compile the TypeScript, SCSS, and Nunjucks templates into the `dist` folder.

If you make changes to the package.json you will need to run `npm link` again to update the global link.

## Documentation

Running `npm run dev:docs` or `npm run docs && npm run docs:serve` will generate and serve the documentation for the components using Pitsby

The documentation for each component is defined in the `component-name.doc.ts` file for each component. This file exports a default object that contains the documentation for the component, including usage examples and any configuration options. This is converted to cjs and put into `pitsbyDocs` by the script in `src/pattern-library/tools/pitsby-docs.ts`. Documentation on how to configure Pitsby can be found in the [Pitsby documentation](https://pitsby.compilorama.com/).
