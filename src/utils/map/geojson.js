import naturtyperUtvalgte from 'data/naturtyper-utvalgte.json';

export function createNaturtyperUtvalgteLayer(map) {
   map.addSource('naturtyper-utvalgte', {
      'type': 'geojson',
      'data': naturtyperUtvalgte
   });

   map.addLayer({
      'id': 'hul-eik',
      'type': 'fill',
      'source': 'naturtyper-utvalgte',
      'paint': {
         'fill-color': 'red',
         'fill-opacity': 0.4
      },
      'filter': ['all',
         ['==', '$type', 'Polygon'],
         ['==', 'utvalgtNaturtype', 'UN03'],
      ]
   });

   map.addLayer({
      'id': 'hul-eik-outline',
      'type': 'line',
      'source': 'naturtyper-utvalgte',
      'paint': {
         'line-color': '#000',
         'line-width': 3
      },
      'filter': ['all',
         ['==', '$type', 'Polygon'],
         ['==', 'utvalgtNaturtype', 'UN03'],
      ]
   });
}
