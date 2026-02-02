export type JobStatusResponse = {
  id: string;
  jobType: string;
  status: JobStatus | "unknown";
};

export type JobStatus =
  | "awaiting_start"
  | "in_progress"
  | "completed"
  | "failed";

/**
 * Web component for monitoring and displaying the status of a job (AI extraction task).
 *
 * This polls the backend for job status, updates the tag,
 * and announces status changes using an aria-live region.
 *
 * Attributes:
 * - job-id:     The ID of the job to check.
 * - job-title:  The title of the job being displayed, used in the accessible status updates.
 * - api-path:   The base API path to fetch job status from. (http://localhost:8081/api/jobs)
 *
 * Expects to find a Govuk Tag as a child, which it colors and updates with the current status.
 *
 * Example usage:
 *   <status-checker job-id="1234" job-title="Article 4 Direction" api-path="http://localhost:8081/api/jobs">
 *     <strong class="govuk-tag govuk-tag--grey">queued</strong>
 *   </status-checker>
 *
 *   <p>
 *     The current status is:
 *     <strong>
 *       <status-checker
 *         job-id="1234"
 *         job-title="Article 4 Direction"
 *         api-path="http://localhost:8081/api/jobs"
 *       >
 *         unknown
 *       </status-checker>
 *     </strong>
 *   </p>
 */
export class StatusChecker extends HTMLElement {
  // props
  static POLL_INTERVAL = 2000; // ms
  static observedAttributes = ["job-id", "job-title", "api-path"];
  static jobStatusList: JobStatus[] = [
    "awaiting_start",
    "in_progress",
    "completed",
    "failed",
  ];

  #jobId: string | null = null;
  #jobTitle: string | null = null;
  #apiPath: string | null = null;

  // elements
  #statusElement: HTMLElement | null = null;
  #alertRegion: HTMLSpanElement | null = null;

  // state
  #polling: boolean = false;
  #currentStatus: JobStatus | "unknown" = "unknown";
  #pollingTimer: number | null = null;

  constructor() {
    super();
  }

  /**
   * Handle component being added to the DOM.
   */
  connectedCallback() {
    this.#initialiseStatusChecker();
    this.#updateStatusCheckerStatus();
    if (this.#jobId && this.#jobTitle && this.#apiPath) {
      this.polling = true;
    }
  }

  /**
   * Handle component being removed from the DOM.
   */
  disconnectedCallback() {
    this.#resetStatusChecker();
  }

  /**
   * Handle attribute changes.
   * @param name The name of the attribute that changed.
   * @param _oldValue The old value of the attribute.
   * @param newValue The new value of the attribute.
   */
  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ) {
    // console.log(
    //   `Attribute ${name} has changed from ${oldValue} to ${newValue}.`
    // );
    if (name === "job-id") this.#jobId = newValue;
    if (name === "job-title") this.#jobTitle = newValue;
    if (name === "api-path") this.#apiPath = newValue;

    // just in case attributes are changed after initialisation
    if (this.#jobId && this.#jobTitle && this.#apiPath) {
      this.#stopPolling(); // Stop any existing polling first
      this.#initialiseStatusChecker();
      this.#updateStatusCheckerStatus();
      this.polling = true;
    }
  }

  /**
   * Initialise the status checker component so that it
   * has the structure and elements it needs for the rest
   * of the component to function
   * @returns void
   */
  #initialiseStatusChecker() {
    this.classList.add("status-checker");
    if (this.#jobId && this.#jobTitle && this.#apiPath) {
      this.#statusElement = this.#applyStatusElement();

      const status = this.#statusElement.textContent?.trim() ?? "unknown";
      this.#currentStatus = StatusChecker.jobStatusList.includes(
        status as JobStatus
      )
        ? (status as JobStatus)
        : "unknown";

      if (this.querySelector(".status-checker__alert")) {
        this.#alertRegion = this.querySelector(
          ".status-checker__alert"
        ) as HTMLSpanElement;
      } else {
        this.#alertRegion = this.#createAlertRegion();
        this.appendChild(this.#alertRegion);
      }
      this.#applyGovukTagStyles();
    }
  }

  /**
   * Apply Govuk Tag styles to the status element based on current status.
   * @returns void
   */
  #applyGovukTagStyles() {
    if (!this.#statusElement) return;
    if (this.#statusElement.classList.contains("govuk-tag") === false) return;
    this.#statusElement.classList.remove(
      "govuk-tag--green",
      "govuk-tag--red",
      "govuk-tag--grey"
    );

    switch (this.#currentStatus) {
      case "completed":
        this.#statusElement.classList.add("govuk-tag--green");
        break;
      case "failed":
        this.#statusElement.classList.add("govuk-tag--red");
        break;
      default:
        this.#statusElement.classList.add("govuk-tag--grey");
    }
  }

  /**
   * Reset the status checker to its initial state.
   * @returns void
   */
  #resetStatusChecker() {
    this.classList.remove("status-checker");
    if (this.#alertRegion && this.contains(this.#alertRegion)) {
      this.removeChild(this.#alertRegion!);
    }
    this.#statusElement = null;
    this.#alertRegion = null;
    this.#currentStatus = "unknown";
    this.#stopPolling();
  }

  /**
   * Update the status element and alert region with the current status.
   * @returns void
   */
  #updateStatusCheckerStatus() {
    if (this.#currentStatus === "unknown") return;
    if (this.#statusElement) {
      this.#statusElement.textContent = this.#currentStatus.trim();
      this.#applyGovukTagStyles();
    }
    if (this.#alertRegion) {
      this.#alertRegion.textContent = `${this.#jobTitle ?? "Job"} is ${this.#currentStatus.trim()}`;
    }
  }

  /**
   * Get or set the polling state.
   */
  get polling() {
    return this.#polling;
  }

  /**
   * Set the polling state.
   * @param value The new polling state.
   */
  set polling(value: boolean) {
    if (this.#polling !== value) {
      this.#polling = value;
      // Side effect: update other variables or trigger actions
      if (value) {
        this.#startPolling();
      } else {
        this.#stopPolling();
      }
    }
  }

  /**
   * Start polling the backend for job status.
   * @returns void
   */
  async #startPolling() {
    // console.log("Start polling");
    // mark it active externally
    this.classList.add("status-checker--active");

    if (this.#alertRegion) {
      this.#alertRegion.setAttribute("aria-busy", "true");
      this.#alertRegion.textContent = "Checking status…";
      // console.log("Checking status…");
    }

    const { status } = await this.#fetchStatus();

    // console.log("status fetched:", status);

    // Clear loading state
    if (this.#alertRegion) {
      // console.log("Status checked.");
      this.#alertRegion.setAttribute("aria-busy", "false");
    }

    this.#currentStatus = status;
    this.#updateStatusCheckerStatus();

    // Continue polling if not completed or failed
    // "awaiting_start" | "in_progress" | "completed" | "failed"
    if (status !== "completed" && status !== "failed" && status !== "unknown") {
      this.#pollingTimer = window.setTimeout(
        () => this.#startPolling(),
        StatusChecker.POLL_INTERVAL
      );
    } else {
      this.#pollingTimer = null;
    }
  }

  /**
   * Stop polling the backend for job status.
   * @returns void
   */
  #stopPolling() {
    // console.log("Stop polling");
    // unmark it active externally
    this.classList.remove("status-checker--active");

    // Clear any existing polling timer
    if (this.#pollingTimer !== null) {
      clearTimeout(this.#pollingTimer);
      this.#pollingTimer = null;
    }
  }

  /**
   * Fetch the job status from the backend API.
   * @returns JobStatusResponse The job status response.
   */
  async #fetchStatus(): Promise<JobStatusResponse> {
    const errorResponse: JobStatusResponse = {
      id: this.#jobId ?? "",
      jobType: "",
      status: "unknown",
    };
    const apiPath = `${this.#apiPath?.replace(/\/$/, "")}/${this.#jobId}`;
    if (!apiPath) return errorResponse;
    try {
      const response = await fetch(apiPath);
      if (!response.ok) throw new Error("Network error");
      const data = await response.json();
      const status = StatusChecker.jobStatusList.includes(
        data.status as JobStatus
      )
        ? (data.status as JobStatus)
        : "unknown";

      // mock delay for demo purposes
      await new Promise(r => setTimeout(r, 5000));

      return {
        id: data.id,
        jobType: data.job_type,
        status,
      };
    } catch (error) {
      console.error("Error fetching status:", error);
      return errorResponse;
    }
  }

  /**
   * Create the alert region for screen readers.
   * @returns HTMLSpanElement The created alert region element.
   */
  #createAlertRegion(): HTMLSpanElement {
    const alert = document.createElement("span") as HTMLSpanElement;
    alert.className = "status-checker__alert";
    alert.setAttribute("aria-live", "polite");
    alert.setAttribute("aria-busy", "false");
    alert.setAttribute("role", "alert");
    alert.textContent = `${this.#jobTitle ?? "Job"} is ${this.#currentStatus?.trim() ?? "unknown"}`;
    return alert;
  }

  /**
   * Returns the element that contains the status text, if its not wrapped already then it will wrap it in a span.
   * Also removes any existing text nodes and returns the status tag element.
   * @returns HTMLSpanElement The status tag element.
   */
  #applyStatusElement(): HTMLElement {
    let tag = this.querySelector(
      ":scope > *:not(.status-checker__alert)"
    ) as HTMLElement;
    if (!tag) {
      const text = this.textContent?.trim() ?? "";
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
      tag = document.createElement("span");
      tag.textContent = text;
      this.appendChild(tag);
    }
    return tag;
  }
}

customElements.define("status-checker", StatusChecker);

declare global {
  interface HTMLElementTagNameMap {
    "status-checker": StatusChecker;
  }
}
