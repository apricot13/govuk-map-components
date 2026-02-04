// Selectively export only the desired config properties
export const isDebug = process.env.NODE_ENV !== "production";
export const basePath = "/";
export const serviceName = "Extract planning data";
export const serviceNameShort = "Extract";

// You can also export other globals if needed
export const exampleGlobal = "This is an example global variable";

export const feedbackHtml = `This is a prototype - your will help us to improve it.`;
export const successMessages = [];
export const errorMessages = [];
