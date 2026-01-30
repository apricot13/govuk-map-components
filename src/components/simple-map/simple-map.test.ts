import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import "./simple-map";
import type { SimpleMap } from "./simple-map";

// Inline mock classes inside vi.mock factories to avoid hoisting issues
vi.mock("maplibre-gl", () => ({
  default: {
    Map: class {
      on = vi.fn();
    },
  },
}));
vi.mock("@geoman-io/maplibre-geoman-free", () => ({
  Geoman: class {
    features = { importGeoJsonFeature: vi.fn() };
  },
}));

describe("SimpleMap Web Component", () => {
  let map: SimpleMap;

  beforeEach(() => {
    map = document.createElement("simple-map") as SimpleMap;
    map.setAttribute("lat", "51.505");
    map.setAttribute("lng", "-0.09");
    map.setAttribute("zoom", "13");
    map.setAttribute("title", "Test Map");
    document.body.appendChild(map);
  });

  afterEach(() => {
    if (map && map.isConnected) map.remove();
    vi.restoreAllMocks();
  });

  it("renders the map container and title", () => {
    // Wait for connectedCallback
    expect(map.querySelector(".simple-map__map")).not.toBeNull();
    expect(map.querySelector(".govuk-heading-m")?.textContent).toBe("Test Map");
  });

  it("shows toggle actions if enableToggle is true", () => {
    map.setAttribute("enableToggle", "true");
    // Re-render
    map.connectedCallback();
    expect(map.querySelector(".simple-map__actions")).not.toBeNull();
    expect(map.querySelector("#show-map")).not.toBeNull();
  });

  it("does not show toggle actions if enableToggle is not true", () => {
    map.removeAttribute("enableToggle");
    map.connectedCallback();
    expect(map.querySelector(".simple-map__actions")).toBeNull();
  });
});
