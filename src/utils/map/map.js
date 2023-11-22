import { Map, NavigationControl } from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';
import { createNaturtyperUtvalgteLayer } from './geojson';
import { createWmsLayer } from './wms';

const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export function createMap(container) {
   const map = new Map({
      accessToken: ACCESS_TOKEN,
      container,
      center: [6.003962, 60.246443],
      zoom: 18,
      style: 'mapbox://styles/mapbox/streets-v12'
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
      //createNaturtyperUtvalgteLayer(map);
   });

   map.on('style.load', () => {
      createTerrain(map);
      create3dBuildings(map);

      map.addLayer({
         id: 'custom-threebox-model',
         type: 'custom',
         renderingMode: '3d',
         onAdd: function () {
            const scale = 0.0015;
            const options = {
               obj: '/modern_home.glb',
               type: 'glb',
               scale: { x: scale, y: scale, z: scale },
               units: 'm',
               anchor: 'auto',
               rotation: { x: 90, y: -90, z: 0 }
            };

            tb.loadObj(options, (model) => {
               model.setCoords([6.003962, 60.246443, 15]);
               debugger
               tb.add(model);
               model.drawBoundingBox();
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
         'id': '3d-buildings',
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
