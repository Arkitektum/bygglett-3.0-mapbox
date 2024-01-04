import naturtyperUtvalgte from 'data/naturtyper-utvalgte.json';
import ullevånaturtyperUtvalgte from 'data/Ullevaal_utvalget_naturtyper.json'
import ullevålEiendomsgrense from 'data/Ullevaal_Oslo_25832_MatrikkelenEiendomskartTeig_eiendomsgrense.json'
import { bufferAreaFromGeoJson } from 'utils/helpers';

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
      }
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
      }
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
      }
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
   creatEiendomsFreeZone(map,eiendom_teig)
   console.log('Buildings:{["type": "111 - Enebolig","type": "181 - Garasjeuthus anneks til bolig",], AREAL = !??!?!}')
   console.log('Eidoms teig {Areal=noko,}')
};

export function creatEiendomsFreeZone(map, eiendom_teig) {
   
   const buffer = bufferAreaFromGeoJson(eiendom_teig,-4)

   map.addSource('Eiendomsgrense_bygg_Tillatt_Line', {
      'type': 'geojson',
      'data': buffer
   });

   map.addLayer(
      {
         'id': 'Eiendomsgrense_bygg_Tillatt_Line',
         'type': 'line',
         'source': 'Eiendomsgrense_bygg_Tillatt_Line',
         'paint': {
            'line-color': 'red',
            'line-width': 1,
            'line-dasharray': [2, 1]
         }
      },
   );
};

export function createOmrådeTeigs(map,områdeTeigs) {
   map.addSource('område-teigs', {
      'type': 'geojson',
      'data': områdeTeigs
   });
   map.addLayer(
      {
         'id': 'Eiendom_teig',
         'type': 'fill',
         'source': 'område-teigs',
         'paint': {
            'fill-color': 'green',
            'fill-opacity': 0.2
         },
         'filter': ['all',
            ['!=', ['get','bygninger'], null]
         ]
      }
   );
   map.addLayer(
      {
         'id': 'nabon-teigs',
         'type': 'line',
         'source': 'område-teigs',
         'paint': {
            'line-color': 'grey',
            'line-width': 4,
            'line-dasharray': [2, 1]
         },
         'filter': ['any',
            ['==', ['get','bygninger'], null]
         ]
      }
   );
}