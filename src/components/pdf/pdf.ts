export class PdfComponent extends HTMLElement {
  static observedAttributes = ["title", "url", "enableToggle"];

  el: Element | null = null;

  connectedCallback() {
    this.#render();
  }

  #render() {
    this.innerHTML = `
      <style>
        .view-pdf__top:has(#show-pdf:not(:checked)) ~ .view-pdf__container { display: none; }
        .view-pdf__top:has(#show-pdf:checked) ~ .view-pdf__container { display: block; }
        .view-pdf .view-pdf__container { width: 100%; }
        .view-pdf .view-pdf__map, .view-pdf #pdf { border: 1px solid #000; width: 100%; height: 100vh; }
      </style>
      <div class="view-pdf">
        <div class="view-pdf__top">
          <h2 class="govuk-heading-m">${this.getAttribute("title")}</h2>
          ${this.#renderActions()}
        </div>
        <div class="view-pdf__container">
          <iframe class="view-pdf__pdf" id="pdf" src="${this.getAttribute("url")}"></iframe>
        </div>
      </div>
    `;

    this.el = this.querySelector(".view-pdf");
  }

  #renderActions() {
    if (this.getAttribute("enableToggle") !== "true") {
      return "";
    }
    return `
      <div class="view-pdf__actions">
        <p class="govuk-body">
          <a href="${this.getAttribute("url")}" class="govuk-link govuk-link--no-visited-state" rel="noreferrer noopener" target="_blank">Open <span class="govuk-visually-hidden">PDF</span> in new window</a>
        </p>
        <fieldset class="govuk-fieldset">
          <legend class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-visually-hidden">
            Show and hide PDF preview
          </legend>
          <div class="govuk-checkboxes govuk-checkboxes--small" data-module="govuk-checkboxes">
            <div class="govuk-checkboxes__item">
              <input class="govuk-checkboxes__input" id="show-pdf" name="show-pdf" type="checkbox" value="show-pdf" checked="checked">
              <label class="govuk-label govuk-checkboxes__label" for="show-pdf">
                Show PDF
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    `;
  }

  // attributeChangedCallback(
  //   name: string,
  //   oldValue: string | null,
  //   newValue: string | null
  // ) {
  //   console.log(
  //     `Attribute ${name} has changed from ${oldValue} to ${newValue}.`
  //   );
  // }
}

customElements.define("view-pdf", PdfComponent);
