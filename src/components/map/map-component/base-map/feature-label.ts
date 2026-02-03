/**
 * Web component for displaying a clickable, keyboard-accessible label on a map feature.
 *
 * @customElement feature-label
 * @extends HTMLElement
 */
export class FeatureLabel extends HTMLElement {
  connectedCallback(): void {
    this.#render();
    this.#renderNavigation();
    this.#addEventListeners();
  }

  /**
   * Gets the index of this feature-label among all feature-label elements that share the same parent element.
   */
  #getIndex() {
    const siblings = Array.from(
      this.parentElement?.querySelectorAll("feature-label") || []
    );
    return {
      index: siblings.indexOf(this),
      total: siblings.length,
      allLabels: siblings,
    };
  }

  #render(): void {
    this.setAttribute("aria-hidden", "true");

    this.innerHTML = `
      <style>
        feature-label {
          background-color: white;
          border: 1px solid var(--govuk-border-colour);
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);

          display: inline-block;
          opacity: 0 !important;
          padding: 10px 15px 5px 15px;
          pointer-events: none;
          position: relative;
          z-index: 1;
        }
        feature-label:has(.feature-label__icon) {
          margin-left: 5px;
          margin-top: 15px;
        }
        feature-label:focus-within {
          opacity: 1 !important;
          pointer-events: auto;
        }
        .feature-label__icon {
          color: #1d70b8;
          position: absolute;
          top: -42px;
          left: -23px;
        }
        .map--satellite-tiles .feature-label__icon {
          color: yellow;
        }
        .feature-label__header {
          align-items: center;
          display: flex;
          gap: 10px;
          justify-content: space-between;
        }
        .feature-label__close {
          background-color: transparent;
          border: 0;
          cursor: pointer;
          position: relative;
          left: 12px;
        }
        .feature-label__close:hover {
          background-color: #f3f2f1;
        }
        feature-label .feature-label__name:focus {
          background-color: transparent;
          box-shadow: none;
          color: #1d70b8;
          text-decoration: underline;
        }
        feature-label .feature-label__name:focus-visible {
          background-color: var(--govuk-focus-colour);
          box-shadow: 0 -2px #ffdd00, 0 4px #0b0c0c;
          color: #0b0c0c;
          text-decoration: none;
        }
        feature-label .feature-label__name:hover {
          text-decoration-thickness: max(3px, .1875rem, .12em);
        }
      </style>
      
      ${
        this.getAttribute("data-feature-type") === "Point"
          ? `
        <svg class="feature-label__icon" width="34" height="41" viewBox="0 0 34 41" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
          <path d="M31.75 16.75C31.75 28.4167 16.75 38.4167 16.75 38.4167C16.75 38.4167 1.75 28.4167 1.75 16.75C1.75 12.7718 3.33035 8.95644 6.1434 6.1434C8.95644 3.33035 12.7718 1.75 16.75 1.75C20.7282 1.75 24.5436 3.33035 27.3566 6.1434C30.1696 8.95644 31.75 12.7718 31.75 16.75Z" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16.75 21.75C19.5114 21.75 21.75 19.5114 21.75 16.75C21.75 13.9886 19.5114 11.75 16.75 11.75C13.9886 11.75 11.75 13.9886 11.75 16.75C11.75 19.5114 13.9886 21.75 16.75 21.75Z" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `
          : ""
      }

      <div class="feature-label__header govuk-!-margin-bottom-2">
        <h2 class="govuk-!-margin-0">
          <a href="${window.location.pathname}/entity/${this.getAttribute("data-feature-id")}" class="feature-label__name govuk-link govuk-!-margin-0">${this.getAttribute("data-feature-name")}</a>
        </h2>
        <button class="feature-label__close">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
            <path d="M24 8L8 24M8 8L24 24" stroke="#1E1E1E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="govuk-visually-hidden">Close</span>
        </button>
      </div>
      <strong class="govuk-tag ${this.getAttribute("data-feature-verified") === "Completed" ? "govuk-tag--green" : "govuk-tag--blue"}">${this.getAttribute("data-feature-verified")}</strong>
      <div class="feature-label__navigation"></div>
    `;
  }

  /**
   * Renders the navigation separately on focus, as we need the total number of features to be known
   */
  #renderNavigation(): void {
    const { index, total } = this.#getIndex();

    (
      this.querySelector(".feature-label__navigation") as HTMLElement
    ).innerHTML = `
      <p class="govuk-body-s govuk-!-margin-top-3 govuk-!-margin-bottom-1">Extraction ${index + 1} of ${total}</p>
      <nav class="govuk-pagination govuk-!-margin-bottom-0" aria-label="Pagination">
        ${
          index > 0
            ? `
          <div class="govuk-pagination__prev">
            <a class="govuk-link govuk-pagination__link" href="#" rel="prev">
              <svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
              </svg>
              <span class="govuk-pagination__link-title">
                Previous<span class="govuk-visually-hidden"> extraction</span>
              </span>
            </a>
          </div>
          `
            : ""
        }
        ${
          index < total - 1
            ? `
          <div class="govuk-pagination__next">
            <a class="govuk-link govuk-pagination__link" href="#" rel="next">
              <span class="govuk-pagination__link-title">
                Next<span class="govuk-visually-hidden"> extraction</span>
              </span>
              <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
              </svg>
            </a>
          </div>
          `
            : ""
        }
      </nav>
    `;
  }

  #addEventListeners(): void {
    this.addEventListener("focusin", evt => {
      // Re-render navigation if focus is entering from outside the feature-label
      const relatedTarget = evt.relatedTarget as Node | null;
      const isFocusFromOutside =
        !relatedTarget || !this.contains(relatedTarget);
      if (isFocusFromOutside) {
        this.#renderNavigation();
        this.querySelector("a")?.focus();
      }
      this.removeAttribute("aria-hidden");
    });
    this.addEventListener("focusout", evt => {
      const relatedTarget = evt.relatedTarget as Node | null;
      if (!relatedTarget || !this.contains(relatedTarget)) {
        this.setAttribute("aria-hidden", "true");
      }
    });
    this.querySelector(".feature-label__close")?.addEventListener(
      "click",
      () => {
        this.parentElement?.querySelector("canvas")?.focus();
      }
    );
    (
      this.querySelector(".feature-label__navigation") as HTMLElement
    ).addEventListener("click", evt => {
      evt.preventDefault();
      const { index, allLabels } = this.#getIndex();
      const link = (evt.target as HTMLElement).closest(
        ".govuk-pagination__link"
      );
      if (link?.getAttribute("rel") === "prev") {
        (
          allLabels[index - 1].querySelector("a") as HTMLElement | null
        )?.focus();
      } else if (link?.getAttribute("rel") === "next") {
        (
          allLabels[index + 1].querySelector("a") as HTMLElement | null
        )?.focus();
      }
    });
  }
}

if (!customElements.get("feature-label")) {
  customElements.define("feature-label", FeatureLabel);
}
