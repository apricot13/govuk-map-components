import { StatusChecker } from "./status-checker";

describe.skip("StatusChecker", () => {
  let container: HTMLElement;
  const responseStatus: number = 200;
  const mockResponse = {
    id: "1",
    job_type: "article4direction",
    status: "awaiting_start",
  };

  const mockedImplementation = () =>
    Promise.resolve(
      new Response(JSON.stringify(mockResponse), {
        status: responseStatus,
        headers: { "Content-Type": "application/json" },
      })
    );

  beforeAll(async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    window.fetch = vi.fn(mockedImplementation) as typeof window.fetch;
  });

  afterAll(() => {
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  describe("when enhancing plain text", () => {
    beforeEach(async () => {
      container.innerHTML = `
      <status-checker job-id="1" job-title="Test Job" api-path="/api/jobs">
        queued
      </status-checker> 
    `;
      // await window.happyDOM.whenAsyncComplete();
      // await window.whenAsyncComplete();
    }, 500);

    test.only("should activate live status checker", () => {
      //   container.innerHTML = `
      //   <status-checker job-id="1" job-title="Test Job" api-path="/api/jobs">
      //     queued
      //   </status-checker>
      // `;

      // find the status-checker element
      const $ = container.querySelector("status-checker") as StatusChecker;
      $.connectedCallback();

      console.log($.getHTML());

      expect($).toBeTruthy();

      // check all attributes are set correctly
      expect($.getAttribute("job-id")).toBe("1");
      expect($.getAttribute("job-title")).toBe("Test Job");
      expect($.getAttribute("api-path")).toBe("/api/jobs");

      // check structure is set correctly
      expect($.classList.contains("status-checker")).toBe(true);

      // check that the text content is wrapped in a span
      const $statusSpan = $.querySelector("span:not(.status-checker__alert)");
      expect($statusSpan).toBeTruthy();
      expect($statusSpan?.textContent?.trim()).toBe("queued");

      // check for accessibility alert region
      const $alert = $.querySelector("span.status-checker__alert");
      expect($alert).toBeTruthy();
      expect($alert?.getAttribute("aria-live")).toBe("polite");
    });
  });

  describe("when enhancing govuk tag", () => {
    test("should render an updatable status checker", () => {
      container.innerHTML = `
      <status-checker job-id="1" job-title="Test Job" api-path="/api/jobs">
        <strong class="govuk-tag govuk-tag--grey">queued</strong>
      </status-checker>
    `;

      // find the status-checker element
      const $ = container.querySelector("status-checker") as StatusChecker;
      console.log($.getHTML());
      expect($).toBeTruthy();

      // check all attributes are set correctly
      expect($.getAttribute("job-id")).toBe("1");
      expect($.getAttribute("job-title")).toBe("Test Job");
      expect($.getAttribute("api-path")).toBe("/api/jobs");

      // check structure is set correctly
      expect($.classList.contains("status-checker")).toBe(true);

      // check for accessibility alert region
      const $alert = $.querySelector(".status-checker__alert");
      expect($alert).toBeTruthy();
      expect($alert?.getAttribute("aria-live")).toBe("assertive");
      expect($alert?.classList.contains("govuk-visually-hidden")).toBe(true);
    });
  });
});

// import { describe, it, expect, beforeEach, vi } from "vitest";
// import { StatusChecker } from "./status-checker";

// // Register the custom element before tests
// if (!customElements.get("status-checker")) {
//   customElements.define("status-checker", StatusChecker);
// }

// describe("StatusChecker", () => {
//   let container: HTMLElement;

//   beforeEach(() => {
//     container = document.createElement("div");
//     document.body.appendChild(container);
//   });

//   afterEach(() => {
//     document.body.innerHTML = "";
//     vi.restoreAllMocks();
//   });

//   it.only("wraps text in a span if no child element", () => {
//     container.innerHTML = `
//       <status-checker job-id="1" job-title="Test Job" api-path="/api/jobs">
//         queued
//       </status-checker>
//     `;
//     const el = container.querySelector("status-checker") as StatusChecker;
//     // el.connectedCallback();

//     console.log(el);

//     const span = el.querySelector("span:not(.status-checker__alert)");
//     expect(span).toBeTruthy();
//     expect(span?.textContent).toBe("queued");
//   });

//   it("uses the first child element as the status tag", () => {
//     container.innerHTML = `
//       <status-checker job-id="1" job-title="Test Job" api-path="/api/jobs">
//         <strong>queued</strong>
//       </status-checker>
//     `;
//     const el = container.querySelector("status-checker") as StatusChecker;
//     el.connectedCallback();

//     const strong = el.querySelector("strong");
//     expect(strong).toBeTruthy();
//     expect(strong?.textContent).toBe("queued");
//   });

//   it("creates an alert region for screen readers", () => {
//     container.innerHTML = `
//       <status-checker job-id="1" job-title="Test Job" api-path="/api/jobs">
//         <strong>queued</strong>
//       </status-checker>
//     `;
//     const el = container.querySelector("status-checker") as StatusChecker;
//     el.connectedCallback();

//     const alert = el.querySelector(".status-checker__alert");
//     expect(alert).toBeTruthy();
//     expect(alert?.getAttribute("aria-live")).toBe("assertive");
//     expect(alert?.classList.contains("govuk-visually-hidden")).toBe(true);
//   });

//   it("sets status color classes based on status", () => {
//     container.innerHTML = `
//       <status-checker job-id="1" job-title="Test Job" api-path="/api/jobs">
//         <strong>completed</strong>
//       </status-checker>
//     `;
//     const el = container.querySelector("status-checker") as StatusChecker;
//     el.connectedCallback();

//     expect(
//       el.querySelector("strong")?.classList.contains("govuk-tag--green")
//     ).toBe(true);
//   });

//   it("shows 'unknown' if fetch fails", async () => {
//     vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));

//     container.innerHTML = `
//       <status-checker job-id="1" job-title="Test Job" api-path="/api/jobs">
//         <strong>queued</strong>
//       </status-checker>
//     `;
//     const el = container.querySelector("status-checker") as StatusChecker;
//     el.connectedCallback();

//     // Wait for async checkStatus
//     await new Promise(r => setTimeout(r, 10));

//     expect(el.querySelector("strong")?.textContent).toBe("unknown");
//   });

//   it("updates alert text when job-title changes", () => {
//     container.innerHTML = `
//       <status-checker job-id="1" job-title="Test Job" api-path="/api/jobs">
//         <strong>queued</strong>
//       </status-checker>
//     `;
//     const el = container.querySelector("status-checker") as StatusChecker;
//     el.connectedCallback();

//     el.setAttribute("job-title", "New Job Title");
//     el.attributeChangedCallback("job-title", "Test Job", "New Job Title");

//     const alert = el.querySelector(".status-checker__alert");
//     expect(alert?.textContent).toContain("New Job Title");
//   });

//   // Accessibility tests
//   it("has only one aria-live region per component", () => {
//     container.innerHTML = `
//       <status-checker job-id="1" job-title="Test Job" api-path="/api/jobs">
//         <strong>queued</strong>
//       </status-checker>
//     `;
//     const el = container.querySelector("status-checker") as StatusChecker;
//     el.connectedCallback();

//     const alerts = el.querySelectorAll('[aria-live="assertive"]');
//     expect(alerts.length).toBe(1);
//   });

//   it("alert region text updates with status changes for screen readers", async () => {
//     vi.spyOn(global, "fetch").mockResolvedValue({
//       ok: true,
//       json: async () => ({ status: "completed" }),
//     } as Response);

//     container.innerHTML = `
//       <status-checker job-id="1" job-title="Test Job" api-path="/api/jobs">
//         <strong>queued</strong>
//       </status-checker>
//     `;
//     const el = container.querySelector("status-checker") as StatusChecker;
//     el.connectedCallback();

//     // Wait for async checkStatus
//     await new Promise(r => setTimeout(r, 10));

//     const alert = el.querySelector(".status-checker__alert");
//     expect(alert?.textContent).toContain("completed");
//   });
// });
