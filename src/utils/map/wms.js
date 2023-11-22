const stormfloWmsUrl = import.meta.env.VITE_WMS_STORMFLO_URL;

export function createWmsLayer(map) {
   map.addSource('stormflo', {
      type: 'raster',
      tiles: [
         stormfloWmsUrl
      ],
      tileSize: 512,
      minzoom: 14,
      maxzoom: 18
   });

   map.addLayer(
      {
         'id': 'stormflo',
         'type': 'raster',
         'source': 'stormflo',
         'paint': {},
      },
      'building'
   );
}
