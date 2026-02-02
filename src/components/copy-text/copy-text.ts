export class CopyText extends HTMLElement {
  static observedAttributes = ["text"];

  #button: HTMLButtonElement | null = null;
  #feedback: HTMLSpanElement | null = null;

  connectedCallback() {
    this.#render();
    this.#button = this.querySelector("button");
    this.#feedback = this.querySelector(".copy-text__feedback");
    if (this.#button) {
      this.#button.addEventListener("click", () => this.#copyText());
    }
  }

  #render() {
    if (this.getAttribute("styled") === "true") {
      this.classList.add("copy-text");
    }
    const instructions = this.innerHTML || "Copy";
    const label = this.getAttribute("label") || "Copy to clipboard";
    const feedback = this.getAttribute("feedback") || "Copied!";
    this.innerHTML = `
      <button type="button" aria-label="${label}" class="copy-text__button">
        <slot>${instructions}</slot>
      </button>
      <span class="copy-text__feedback" aria-live="polite" style="display:none;">${feedback}</span>
    `;
  }

  #copyText() {
    const text = this.getAttribute("text") || "";
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      if (this.#feedback) {
        this.#feedback.style.display = "inline";
        setTimeout(() => {
          if (this.#feedback) this.#feedback.style.display = "none";
        }, 2000);
      }
    });
  }
}

customElements.define("copy-text", CopyText);
