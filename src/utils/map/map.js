import mapboxgl, { Map, NavigationControl } from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';
import { createNaturtyperUtvalgteLayer, createullevålEiendomsgrense } from './geojson';
import { createBuildings } from './buildings';
import { createTerrain } from './terrain';
import  PitchToggle  from '@watergis/mapbox-gl-pitch-toggle-control';
import '@watergis/mapbox-gl-pitch-toggle-control/css/styles.css';
//import { createWmsLayer } from './wms';

const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export function createMap(container, location) {
   const target = {
      center: location,
      zoom: 18,
      pitch: 45,
      bearing: 0
   };

   const map = new Map({
      accessToken: ACCESS_TOKEN,
      container,
      style: 'mapbox://styles/mapbox/streets-v12',
      ...target
   });

   map.addControl(new NavigationControl());
   map.addControl(new mapboxgl.ScaleControl());   
   map.addControl(new mapboxgl.FullscreenControl())
   map.addControl(new PitchToggle({minpitchzoom: 0})) 

   window.tb = new Threebox(map, map.getCanvas().getContext('webgl'), {
      defaultLights: true,
      enableSelectingObjects: true,
      enableDraggingObjects: true,
      enableRotatingObjects: true
   });

   map.on('load', () => {
      createNaturtyperUtvalgteLayer(map);
      createullevålEiendomsgrense(map);

      setTimeout(() => {
         map.jumpTo(target);
         container.classList.add('ready');
      }, 500);
   });

   map.on('style.load', () => {
      createTerrain(map);
      createBuildings(map);
      //createWmsLayer(map);
   });

   return map;
}
