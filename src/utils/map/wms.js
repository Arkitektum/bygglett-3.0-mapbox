
export function createWmsLayer(map, wmsUrl,layerName){

   map.addSource(layerName, {
      type: 'raster',
      tiles: [wmsUrl],
      tileSize: 512,
      minzoom: 14,
      maxzoom: 18
   });

   map.addLayer(
      {
         'id': layerName,
         'type': 'raster',
         'source': layerName,
         'paint': {},
      }
   );
}