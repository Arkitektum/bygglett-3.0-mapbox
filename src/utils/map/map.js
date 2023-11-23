import { Map, NavigationControl } from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';
import { createNaturtyperUtvalgteLayer } from './geojson';
import { createBuilding } from './building';
import { createBuildings } from './buildings';
import { createTerrain } from './terrain';

const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export async function createMap(container, location, altitude, building) {
   return new Promise(resolve => {
      const target = {
         center: location,
         zoom: 18,
         pitch: 60,
         bearing: -60
      };

      const map = new Map({
         accessToken: ACCESS_TOKEN,
         container,
         style: 'mapbox://styles/mapbox/streets-v12',
         ...target
      });

      map.addControl(new NavigationControl());

      window.tb = new Threebox(map, map.getCanvas().getContext('webgl'), {
         defaultLights: true,
         enableSelectingObjects: true,
         enableDraggingObjects: true,
         enableRotatingObjects: true
      });

      map.on('load', () => {
         createNaturtyperUtvalgteLayer(map);

         setTimeout(
            () => {
               map.jumpTo(target);
               resolve(map);
            },
            100
         );

         //createWmsLayer(map);
      });

      map.on('style.load', () => {
         createTerrain(map);
         createBuildings(map);
         createBuilding(map, location, altitude, building);
      });
   });
}




