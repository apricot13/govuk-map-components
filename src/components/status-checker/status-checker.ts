const CHECK_INTERVAL = 2000;

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
  private tag: HTMLElement | null = null;
  private alert: HTMLSpanElement | null = null;
  private polling = false;

  connectedCallback(): void {
    // Require api-path attribute
    const apiPath = this.getAttribute("api-path");
    if (!apiPath) return;

    // Find the first child element to use as the status tag
    this.tag = this.querySelector(":scope > *:not(.status-checker__alert)");
    if (!this.tag) {
      // If no child element, wrap existing text in a span
      const text = this.textContent?.trim() || "";
      // Remove all text nodes
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
      this.tag = document.createElement("span");
      this.tag.textContent = text;
      this.appendChild(this.tag);
    }

    // Create alert region if it doesn't exist
    this.alert = this.querySelector(
      ".status-checker__alert"
    ) as HTMLSpanElement;
    if (!this.alert) {
      this.alert = document.createElement("span");
      this.alert.className = "govuk-visually-hidden status-checker__alert";
      this.alert.setAttribute("aria-live", "assertive");
      this.appendChild(this.alert);
    }

    // Set initial status color and start polling if needed
    this.#setStatusColour();
    if (this.tag.textContent?.trim() !== "completed") {
      this.polling = true;
      this.#checkStatus();
    }
  }

  /**
   * Stop polling when the element is removed from the DOM.
   */
  disconnectedCallback(): void {
    this.polling = false;
  }

  /**
   * Handle attribute changes.
   * @param name
   * @param oldValue
   * @param newValue
   */
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void {
    // If job-id changes, restart polling
    if (name === "job-id" && oldValue !== newValue && this.polling) {
      this.#checkStatus();
    }
    // If job-title changes, update alert text
    if (name === "job-title" && this.alert) {
      this.#setAlert(this.tag?.textContent || "");
    }
  }

  /**
   * Check the job status from the backend and update the tag and alert.
   * @returns
   */
  async #checkStatus(): Promise<void> {
    if (!this.polling || !this.tag || !this.getAttribute("job-id")) return;
    const apiPath = this.getAttribute("api-path");
    if (!apiPath) return;
    try {
      const response = await fetch(
        `${apiPath.replace(/\/$/, "")}/${this.getAttribute("job-id")}`
      );
      if (!response.ok) throw new Error("Network error");
      const data = await response.json();
      const statusText = data.status || "unknown";

      this.tag.textContent = statusText.replace("_", " ");
      this.#setAlert(this.tag.textContent || "");
      this.#setStatusColour();

      if (
        statusText !== "completed" &&
        statusText !== "failed" &&
        this.polling
      ) {
        window.setTimeout(() => this.#checkStatus(), CHECK_INTERVAL);
      }
    } catch {
      this.tag.textContent = "unknown";
      this.#setAlert("unknown");
      this.#setStatusColour();
    }
  }
  /**
   * Set the color of the status tag based on the current status.
   * @returns
   */
  #setStatusColour(): void {
    if (!this.tag) return;
    const statusText = this.tag.textContent?.trim();
    this.tag.classList.remove(
      "govuk-tag--green",
      "govuk-tag--red",
      "govuk-tag--grey"
    );
    if (statusText === "completed") {
      this.tag.classList.add("govuk-tag--green");
    } else if (statusText === "failed" || statusText === "error") {
      this.tag.classList.add("govuk-tag--red");
    } else {
      this.tag.classList.add("govuk-tag--grey");
    }
  }

  /**
   * Set the alert text for screen readers.
   * @param statusText The current status text to be announced.
   */
  #setAlert(statusText: string): void {
    if (this.alert) {
      this.alert.textContent = `${
        this.getAttribute("job-title") || "Job"
      } is ${statusText}`;
    }
  }
}

customElements.define("status-checker", StatusChecker);

declare global {
  interface HTMLElementTagNameMap {
    "status-checker": StatusChecker;
  }
}
