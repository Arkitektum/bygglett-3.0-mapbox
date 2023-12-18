import booleanIntersects from '@turf/boolean-intersects';
import { getObjectArea } from 'utils/helpers';
import buffer from '@turf/buffer';
import { degreesToRadians, feature, radiansToLength } from '@turf/helpers';
import { setIntersection, toggleDialog } from 'store/slices/mapSlice';
import store from 'store';
import GeoJSONReader from 'jsts/org/locationtech/jts/io/GeoJSONReader';
import DistanceOp from 'jsts/org/locationtech/jts/operation/distance/DistanceOp';

// TODO filter geoJson før import

export async function createBuilding(map, location, building) {
   return new Promise(resolve => {
      map.addLayer({
         id: 'building-bygglett',
         type: 'custom',
         renderingMode: '3d',
         onAdd: () => {
            const scale = 0.6;
   
            const options = {
               obj: `/${building}.glb`,
               type: 'glb',
               scale: { x: scale, y: scale, z: scale },
               units: 'meters',
               anchor: 'center',
               rotation: { x: 90, y: -90, z: 0 }
            };
   
            window.tb.loadObj(options, model => {
               model.setCoords([location.lat, location.long, location.altitude]);
   
               addObjectLayer(map, model);
               addObjectBufferLayer(map, model)
   
               model.addEventListener('ObjectDragged', event => {
                  handleObjectDragged(event.target, map);
               }, false);
   
               window.tb.add(model);
               
               resolve(model);
            });
         },
   
         render: () => {
            window.tb.update();
         }
      });
   })
}

export function handleObjectDragged(object, map) {
   const area = getObjectArea(object);
   map.getSource('object-area').setData(area);

   const areaOfInterest = buffer(area, 50, {
      units: 'meters'
   })
  
   const reader = new GeoJSONReader();
   const areaGeometry = reader.read(area.geometry);

   // Filter polygons based on intersection or inclusion
   const sourceFeatures = map.querySourceFeatures('naturtyper-utvalgte');
   const features = sourceFeatures.filter(feature => booleanIntersects(feature.geometry, areaOfInterest));

   if (features.length) {

      const distanceArray = features.map((feature) => {

         const reader = new GeoJSONReader();
         const featureGeometry = reader.read(feature.geometry);

         const distanceInDegrees = new DistanceOp(featureGeometry, areaGeometry).distance()
         const distanceInRadians = degreesToRadians(distanceInDegrees)
         const distanceInMeter = radiansToLength(distanceInRadians, 'meters')
         return distanceInMeter

      });
      const minDistanceInMeter = Math.min(...distanceArray);
      const roundedDistance = Math.round(minDistanceInMeter * 10) / 10;   
         
      const body = () => {
         if (roundedDistance > 0) {
            
         return  `Du er ${roundedDistance} meter fra grensen mot Hul Eik`
      } 
      return `Bygget er plassert nærmere enn 15 meter fra stammen`
      }
      const title = () => { 
         return "Kritiske funn";
      }
      const tiltak = () => { 
         if (roundedDistance <= 0) {
            return "Mulige tiltak";
      }
      }
      const tiltakstekst = () => { 
         if (roundedDistance <= 0) {
            return "Flytt tiltaket vekk fra fareutsatt område. Dokumenter tilstrekkelig sikkerhet mot flom og erosjon i henhold til krav gitt i byggteknisk forskrift (TEK17) § 7-2.";
         }
      }
         
              
      
      store.dispatch(toggleDialog({title:title(), body:body(), tiltak:tiltak(), tiltakstekst:tiltakstekst()}))    
        
   } else {
      store.dispatch(toggleDialog(false))
   }

   const intersecting = features.find(feature => booleanIntersects(feature.geometry, area));
   let color = 'green';

   if (intersecting) {
      const { state, tile, ...feature } = intersecting.toJSON();
      store.dispatch(setIntersection(feature));
      color = 'red';
   } else {
      store.dispatch(setIntersection(null));
   }

   map.setPaintProperty('object-area', 'fill-color', color);
}

function addObjectLayer(map, model) {
   map.addSource('object-area', {
      type: 'geojson',
      data: getObjectArea(model)
   });

   map.addLayer({
      id: 'object-area',
      type: 'fill',
      source: 'object-area',
      paint: {
         'fill-color': 'green',
         'fill-opacity': 0.4
      }
   });
}
function addObjectBufferLayer(map, model) {
   const area = getObjectArea(model);
   const areaBuffer = buffer(area, 50, {
      units: 'meters'
   })

   map.addSource('object-bufferArea', {
      type: 'geojson',
      data: areaBuffer
   });

   map.addLayer({
      id: 'object-byfferArea',
      type: 'fill',
      source: 'object-bufferArea',
      paint: {
         'fill-color': 'blue',
         'fill-opacity': 0
      }
   });
}