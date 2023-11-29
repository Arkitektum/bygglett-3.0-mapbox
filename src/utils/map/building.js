import booleanIntersects from '@turf/boolean-intersects';
import { getObjectArea } from 'utils/helpers';
import buffer from '@turf/buffer';
import { degreesToRadians, feature, radiansToLength } from '@turf/helpers';
import { setIntersection } from 'store/slices/mapSlice';
import store from 'store';
import GeoJSONReader from 'jsts/org/locationtech/jts/io/GeoJSONReader';
import GeoJSONWriter from 'jsts/org/locationtech/jts/io/GeoJSONWriter';
import DistanceOp from 'jsts/org/locationtech/jts/operation/distance/DistanceOp';


// TODO filter geoJson før import




export function createBuilding(map, location, altitude, building) {
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
            model.setCoords([location[0], location[1], altitude]);

            addObjectLayer(map, model);
            addObjectBufferLayer(map, model)

            model.addEventListener('ObjectDragged', event => {
               handleObjectDragged(event.target, map);
            }, false);

            window.tb.add(model);
         });
      },

      render: () => {
         window.tb.update();
      }
   });
}

function handleObjectDragged(object, map) {
   const area = getObjectArea(object);
   map.getSource('object-area').setData(area);

   const areaOfInterest = buffer(area, 50, {
      units: 'meters'
   })
   map.getSource('object-bufferArea').setData(areaOfInterest);


   const reader = new GeoJSONReader();
   const areaGeometry = reader.read(area.geometry);

   // Filter polygons based on intersection or inclusion
   const sourceFeatures = map.querySourceFeatures('naturtyper-utvalgte');
   const features = sourceFeatures.filter(feature => booleanIntersects(feature.geometry, areaOfInterest));

   if (features != null) {

      const distanceArray = features.map((feature) => {

         const reader = new GeoJSONReader();
         const featureGeometry = reader.read(feature.geometry);

         const distanceInDegrees = new DistanceOp(featureGeometry, areaGeometry).distance()
         const distanceInRadians = degreesToRadians(distanceInDegrees)
         const distanceInMeter = radiansToLength(distanceInRadians, 'meters')
         return distanceInMeter

      });
      const minDistanceInMeter = Math.min(...distanceArray);
      console.log("korteste avstand i mts : " + minDistanceInMeter)
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
         'fill-opacity': 0.2
      }
   });
}