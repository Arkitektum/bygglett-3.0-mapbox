export function createBuildings(map) {
   const layers = map.getStyle().layers;
   const labelLayerId = layers.find(layer => layer.type === 'symbol' && layer.layout['text-field']).id;

   map.addLayer(
      {
         'id': 'buildings',
         'source': 'composite',
         'source-layer': 'building',
         'filter': ['==', 'extrude', 'true'],
         'type': 'fill-extrusion',
         'minzoom': 15,
         'paint': {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
               'interpolate',
               ['linear'],
               ['zoom'],
               15,
               0,
               15.05,
               ['get', 'height']
            ],
            'fill-extrusion-base': [
               'interpolate',
               ['linear'],
               ['zoom'],
               15,
               0,
               15.05,
               ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.8
         }
      },
      labelLayerId
   );
}