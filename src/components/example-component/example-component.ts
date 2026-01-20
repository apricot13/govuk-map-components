export class MyBox extends HTMLElement {
  static get observedAttributes() {
    return ["color", "label"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const color = this.getAttribute("color") || "#0078d4";
    const label = this.getAttribute("label") || "Coloured Box";
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          .box {
            width: 200px;
            height: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            border: 2px solid #333;
            font-size: 1.2rem;
            color: #fff;
            background: ${color};
          }
        </style>
        <div class="box">${label}</div>
      `;
    }
  }
}

customElements.define("my-box", MyBox);
