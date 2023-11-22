import { Map, NavigationControl, Popup } from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';
import { createNaturtyperUtvalgteLayer } from './geojson';
import { createWmsLayer } from './wms';
import { getObjectArea } from 'utils/helpers';
import style from './map.module.scss';
import { radiansToDegrees } from '@turf/helpers';
import transformRotate from '@turf/transform-rotate';
import booleanIntersects from '@turf/boolean-intersects';

const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const start = {
   center: [6.004476482266369, 60.24443606674362],
   zoom: 12,
   pitch: 0,
   bearing: 0
};

const target = {
   center: [6.004476482266369, 60.24443606674362],
   zoom: 18,
   pitch: 60,
   bearing: -60
};

export function createMap(container) {
   const map = new Map({
      accessToken: ACCESS_TOKEN,
      container,
      style: 'mapbox://styles/mapbox/streets-v12',
      ...start
   });

   map.addControl(new NavigationControl());

   map.on('click', 'hul-eik', (e) => {
      // Copy coordinates array

      const description = '<strong>' + e.features[0].properties.utvalgtNaturtypeTekst + '</strong>' +
         '<p>' + e.features[0].properties.områdenavn + '</p>' +
         '<p>Eiketrær kan bli flere hundre år gamle og et stort mangfold av arter lever i hulrom, dype barkesprekker og på døde grener i slike trær. Så mange som 1500 arter kan leve på og i hule eiker. Hul eik er en utvalgt naturtype som skal tas hensyn til og vurderes i byggesøknaden.</p>' +
         '<p>Tiltaket kan plasseres 15m eller lengre fra stammen. <br /> Dersom tiltaket må plasseres nærmere enn 15m fra stammen, skal kommunen vurdere tiltaket i henhold til bestemmelsene i naturmangfoldloven. Rotsystemet på treet må ikke skades. En arborist kan vurdere det for deg. Gi en begrunnelse for behovet og legg ved en eventuell uttalelse fra arborist.</p>' +
         '<ul><li>Opphav: ' + e.features[0].properties.opphav + '</li>' +
         '<li>Navnerom: <a href=" ' + e.features[0].properties.identifikasjon_navnerom + ' ">Navnerom </a></li>' +
         '<li>Nøyaktighetsklasse:  ' + e.features[0].properties.nøyaktighetsklasse + '</li>' +
         '<li>Faktark<a href=" ' + e.features[0].properties.faktaark + ' ">Faktaark fra miljødirektoratet </a></li></ul>';


      new Popup({ className: style.popup }).setLngLat([e.lngLat.lng, e.lngLat.lat]).setHTML(description).addTo(map);
   })


   const tb = (window.tb = new Threebox(map, map.getCanvas().getContext('webgl'), {
      defaultLights: true,
      enableSelectingObjects: true,
      enableDraggingObjects: true,
      enableRotatingObjects: true
   }));

   map.on('load', () => {
      //createWmsLayer(map);

      setTimeout(
         () => {
            map.flyTo({
               ...target, // Fly to the selected target
               duration: 1000, // Animate over 12 seconds
               essential: true // This animation is considered essential with
               //respect to prefers-reduced-motion
            })
         },
         1000
      );

      map.on('mouseenter', 'places', () => {
         map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'places', () => {
         map.getCanvas().style.cursor = '';
      });

      createNaturtyperUtvalgteLayer(map);
   });

   map.on('style.load', () => {
      createTerrain(map);
      create3dBuildings(map);

      map.addLayer({
         id: 'custom-threebox-model',
         type: 'custom',
         renderingMode: '3d',
         onAdd: function () {
            const scale = 1;

            const options = {
               obj: '/moderne-hus.glb',
               type: 'glb',
               scale: { x: scale, y: scale, z: scale },
               units: 'meters',
               anchor: 'center',
               rotation: { x: 90, y: -90, z: 0 }
            };

            tb.loadObj(options, (model) => {
               model.setCoords([6.004476482266369, 60.24443606674362, 15]);



               map.addSource('object-area', {
                  type: 'geojson',
                  data: getObjectArea(model)
               });

               map.addLayer({
                  id: 'object-area',
                  type: 'fill',
                  source: 'object-area',
                  paint: {
                     'fill-color': 'red',
                     'fill-opacity': 0.4
                  }
               })

               model.addEventListener('ObjectDragged', event => {
                  const object = event.target;
                  const area = getObjectArea(object);

                  const features = map.querySourceFeatures('naturtyper-utvalgte', {
                     sourceLayer: 'naturtyper-utvalgte'
                  });

                  console.log('Intersects: ', features.some(feature => booleanIntersects(feature.geometry, area)));

                  const source = map.getSource('object-area');
                  source.setData(area)
                  
               }, false);

               tb.add(model);
            });
         },
         // onAdd: function () {
         //    const scale = 1.5;
         //    const options = {
         //       obj: '/small_modern_garage.glb',
         //       type: 'glb',
         //       scale: { x: scale, y: scale, z: scale },
         //       units: 'm',
         //       anchor: 'auto',
         //       rotation: { x: 90, y: -90, z: 0 }
         //    };

         //    tb.loadObj(options, (model) => {
         //       model.setCoords([6.003962, 60.246443, 15]);
         //       tb.add(model);
         //    });
         // },

         render: function () {
            tb.update();
         }
      });
   });

   return map;
}

function createTerrain(map) {
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

function create3dBuildings(map) {
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
            'fill-extrusion-opacity': 0.6
         }
      },
      labelLayerId
   );
}
