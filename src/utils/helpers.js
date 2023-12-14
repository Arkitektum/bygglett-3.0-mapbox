import { lengthToDegrees, polygon, radiansToDegrees } from '@turf/helpers';
import transformRotate from '@turf/transform-rotate';
import buffer from '@turf/buffer';

export function getObjectArea(object) {
   const { rotation, coordinates, modelSize } = object;
   const [centerLat, centerLon] = coordinates;
   const { x, y } = modelSize;
   const lat = lengthToDegrees(x, 'meters');
   const lon = lengthToDegrees(y / 2, 'meters');

   const area = polygon([[
      [centerLat - lat, centerLon - lon],
      [centerLat + lat, centerLon - lon],
      [centerLat + lat, centerLon + lon],
      [centerLat - lat, centerLon + lon],
      [centerLat - lat, centerLon - lon]
   ]]);

   if (rotation.z !== 0) {
      const angle = radiansToDegrees(rotation.z);
      transformRotate(area, -angle, { pivot: [coordinates[0], coordinates[1]], mutate: true });
   }

   return area;
}

export function bufferAreaFromGeoJson(feature, distance=-4){
   
   const area = feature.geometry
   const bufferdArea = bufferArea(area, distance)
   bufferdArea.properties= feature.properties
   return bufferdArea
}

export function bufferArea(area, distance=50){

   const bufferdArea = buffer(area, distance, {
      units: 'meters'
   })
   return bufferdArea
}