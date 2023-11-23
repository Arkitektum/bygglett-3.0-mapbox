export function createTerrain(map) {
   map.addSource('mapbox-dem', {
      type: 'raster-dem',
      url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
      tileSize: 512,
      maxzoom: 14
   });

   map.setTerrain({
      source: 'mapbox-dem',
      exaggeration: 1
   });
}