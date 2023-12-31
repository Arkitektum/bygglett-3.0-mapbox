import mapboxgl, { Map, NavigationControl } from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';
import { createNaturtyperUtvalgteLayer, createullevålEiendomsgrense,creatEiendomsTeig } from './geojson';
import { createBuildings } from './buildings';
import { createTerrain } from './terrain';
import  PitchToggle  from '@watergis/mapbox-gl-pitch-toggle-control';
import '@watergis/mapbox-gl-pitch-toggle-control/css/styles.css';
import axios from 'axios';

const fkb4Graaton = import.meta.env.VITE_WMS_FKB4_GRAATON;
const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export function createMap(container, location) {
   const target = {
      center: [location.lat, location.long],
      zoom: 18,
      pitch: 0,
      bearing: 0
   };

   const map = new Map({
      accessToken: ACCESS_TOKEN,
      container,
      // style: 'mapbox://styles/mapbox/light-v11',
      style:'mapbox://styles/mgtuser/clq6hqnqg001a01o97vv29h7v',
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

   map.on('load', async () => {
      createNaturtyperUtvalgteLayer(map);
      createullevålEiendomsgrense(map);
      const eiendoms_teig= await findEiendomsOmråde(location.long,location.lat,100)
      creatEiendomsTeig(map,eiendoms_teig)

      setTimeout(() => {
         map.jumpTo(target);
         container.classList.add('ready');
      }, 500);
   });

   map.on('style.load', () => {
      // createWmsLayer(map,fkb4Graaton,'topo4graatone');
      // createBackgroundGraaton(map)
      createTerrain(map);
      // createBuildings(map);
      
   });
   
   return map;
}

async function findEiendomsOmråde(lat, lon, radius, treff=1) {
    const url_omroder =`https://ws.geonorge.no/eiendom/v1/punkt/omrader?ost=${lon}&nord=${lat}&koordsys=4326&radius=${radius}&utkoordsys=4258&maksTreff=${treff}`;
   const response = await axios.get(url_omroder)
    return response.data.features[0]
 
}