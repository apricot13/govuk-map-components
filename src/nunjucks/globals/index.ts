// Selectively export only the desired config properties
export const isDebug = process.env.NODE_ENV !== "production";
export const basePath = "/";
export const serviceName = "Extract planning data";
export const serviceNameShort = "Extract";
export const feedbackUrl =
  process.env.FEEDBACK_URL || "https://forms.gle/ga424FcF52k3Lot49";

// You can also export other globals if needed
export const exampleGlobal = "This is an example global variable";

export const feedbackHtml = feedbackUrl
  ? `This is a prototype - your <a class="govuk-link" href="${feedbackUrl}">feedback</a> will help us to improve it.`
  : "This is a prototype.";
export const successMessages = [];
export const errorMessages = [];
