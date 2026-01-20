import { describe, it, expect, beforeEach } from "vitest";
import "./example-component";

describe("MyBox Web Component", () => {
  let box: HTMLElement;

  beforeEach(() => {
    box = document.createElement("my-box");
    document.body.appendChild(box);
  });

  it("renders with default values", () => {
    const shadow = box.shadowRoot!;
    expect(shadow.querySelector(".box")!.textContent).toBe("Coloured Box");
    expect(shadow.querySelector(".box")!.getAttribute("style")).toBeNull();
    expect(shadow.querySelector("style")!.textContent).toContain(
      "background: #0078d4;"
    );
  });

  it("renders with custom color and label", () => {
    box.setAttribute("color", "#ff0000");
    box.setAttribute("label", "Red Box");
    const shadow = box.shadowRoot!;
    expect(shadow.querySelector(".box")!.textContent).toBe("Red Box");
    expect(shadow.querySelector("style")!.textContent).toContain(
      "background: #ff0000;"
    );
  });

  it("updates when attributes change", () => {
    box.setAttribute("label", "Updated Box");
    const shadow = box.shadowRoot!;
    expect(shadow.querySelector(".box")!.textContent).toBe("Updated Box");
    box.setAttribute("color", "#00ff00");
    expect(shadow.querySelector("style")!.textContent).toContain(
      "background: #00ff00;"
    );
  });

  afterEach(() => {
    box.remove();
  });
});
