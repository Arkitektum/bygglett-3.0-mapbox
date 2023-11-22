import { Map, NavigationControl } from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';
import { createNaturtyperUtvalgteLayer } from './geojson';
import { createWmsLayer } from './wms';
import { createBoundingBox } from 'utils/helpers';


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

   map.on('click', event => {
      console.log(event);
   });

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

   });

   map.on('style.load', () => {
      createTerrain(map);
      create3dBuildings(map);
      createNaturtyperUtvalgteLayer(map);

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

               model.addEventListener('ObjectDragged', event => {
                  // console.log(event.target.coordinates);
                  // console.log(event.target.rotation);
                  // console.log(event.target.left);
                  console.log(event.target.matrix.elements);
                  const boundingBox = createBoundingBox(event.target);
                  //console.log(boundingBox);
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
