import naturtyperUtvalgte from 'data/naturtyper-utvalgte.json';
import ullevånaturtyperUtvalgte from 'data/Ullevaal_utvalget_naturtyper.json'
import ullevålEiendomsgrense from 'data/Ullevaal_Oslo_25832_MatrikkelenEiendomskartTeig_eiendomsgrense.json'

export function createNaturtyperUtvalgteLayer(map) {
   map.addSource('naturtyper-utvalgte', {
      'type': 'geojson',
      'data': ullevånaturtyperUtvalgte
   });

   map.addLayer(
      {
         'id': 'border',
         'type': 'line',
         'source': 'naturtyper-utvalgte',
         'paint': {
            'line-color': 'red',
            'line-width': 4,
            'line-dasharray': [2, 1]
         },
         'filter': ['all',
            ['==', 'utvalgtNaturtype', 'UN03']
         ]
      },
      'buildings'
   );
   map.addLayer(
      {
         'id': 'hul-eik',
         'type': 'fill',
         'source': 'naturtyper-utvalgte',
         'paint': {
            'fill-color': 'red',
            'fill-opacity': 0.4
         },
         'filter': ['all',
            ['==', 'utvalgtNaturtype', 'UN03']
         ]
      },
      'buildings'
   );
}

export function createUllevålNaturtyperUtvalgteLayer(map) {
   map.addSource('ullevål_naturtyper-utvalgte', {
      'type': 'geojson',
      'data': ullevånaturtyperUtvalgte
   });

   map.addLayer(
      {
         'id': 'ullevål-hul-eik',
         'type': 'fill',
         'source': 'ullevål_naturtyper-utvalgte',
         'paint': {
            'fill-color': 'green',
            'fill-opacity': 0.4
         },
         'filter': ['all',
            ['==', 'utvalgtNat', 'UN03']
         ]
      },
      'buildings'
   );
}
export function createullevålEiendomsgrense(map) {
   map.addSource('ullevål_Eiendomsgrense', {
      'type': 'geojson',
      'data': ullevålEiendomsgrense
   });

   map.addLayer(
      {
         'id': 'ullevål-Eiendomsgrense',
         'type': 'line',
         'source': 'ullevål_Eiendomsgrense',
         'paint': {
            'line-color': 'green',
            'line-width': 2
         }
      }
   );
};
export function creatEiendomsTeig(map, eiendom_teig) {
   map.addSource('Eiendoms_teig', {
      'type': 'geojson',
      'data': eiendom_teig
   });

   map.addLayer(
      {
         'id': 'Eiendoms_teig',
         'type': 'fill',
         'source': 'Eiendoms_teig',
         'paint': {
            'fill-color': 'green',
            'fill-opacity': 0.2
         }
      }
   );
};






// map.addLayer({
//    "id": "polygon-stripes-example",
//    "type": "fill",
//    "metadata": {
//       "maphubs:layer_id": 1,
//       "maphubs:globalid": "abc123",
//       "maphubs:interactive": true,
//       "maphubs:showBehindBaseMapLabels": false,
//       "maphubs:images": [
//          {
//             "name": "stripes",
//             "width": 8,
//             "height": 8,
//             "svg": "<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><rect width='10' height='10' fill-opacity='0' /><path d='M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2' stroke='black' stroke-width='1'/></svg>"
//          }
//       ],
//       "maphubs:outline-only": false
//    },
//    "source": "naturtyper-utvalgte",
//    //"source-layer": "data",
//    'filter': ['all',
//       ['==', '$type', 'Polygon'],
//       ['==', 'utvalgtNaturtype', 'UN03'],
//    ],
//    "paint": {
//       "fill-pattern": "stripes",
//       "fill-opacity": 0.7
//    }
// });

// map.addLayer({
//    'id': 'pattern-layer',
//    'type': 'fill',
//    'source': 'naturtyper-utvalgte',
//    'paint': {
//       'fill-pattern': 'pattern'
//    },
//    'filter': ['all',
//       ['==', '$type', 'Polygon'],
//       ['==', 'utvalgtNaturtype', 'UN03'],
//    ]
// });

// map.addLayer({
//    'id': 'hul-eik-outline',
//    'type': 'line',
//    'source': 'naturtyper-utvalgte',
//    'paint': {
//       'line-color': '#6b0700',
//       'line-width': 2
//    },
//    'filter': ['all',
//       ['==', '$type', 'Polygon'],
//       ['==', 'utvalgtNaturtype', 'UN03'],
//    ]
// });

