import ml from "maplibre-gl";
export const MAP_STYLES: Record<string, ml.StyleSpecification> = {
  fallback: {
    version: 8,
    glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
    sources: {
      "raster-tiles": {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "© OpenStreetMap contributors",
      },
    },
    layers: [
      {
        id: "osm-tiles",
        type: "raster",
        source: "raster-tiles",
        minzoom: 0,
        maxzoom: 24,
      },
    ],
  },
  googleSatellite: {
    version: 8,
    sources: {
      satellite: {
        type: "raster",
        url: "https://demotiles.maplibre.org/debug-tiles/number/tiles.json",
        tileSize: 256,
        maxzoom: 22,
      },
    },
    layers: [
      {
        id: "satellite",
        type: "raster",
        source: "satellite",
      },
    ],
  },
  // googleSatellite: {
  //   version: 8,
  //   glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  //   sources: {
  //     "google-satellite": {
  //       type: "raster",
  //       tiles: ["/api/satellite-tiles/{z}/{x}/{y}"],
  //       tileSize: 256,
  //       attribution: "© Google",
  //     },
  //   },
  //   layers: [
  //     {
  //       id: "google-satellite-layer",
  //       type: "raster",
  //       source: "google-satellite",
  //       minzoom: 0,
  //       maxzoom: 22,
  //     },
  //   ],
  // },
} as const;
