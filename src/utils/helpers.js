import { lengthToDegrees, polygon } from '@turf/helpers';

export function createBoundingBox(object) {
   const { x, y } = object.modelSize;
   const coordinates = object.coordinates;
   const lat = lengthToDegrees(x, 'meters');
   const lon = lengthToDegrees(y / 2, 'meters');

   return polygon([[
      [coordinates[0] - lat, coordinates[1] - lon],
      [coordinates[0] + lat, coordinates[1] - lon],
      [coordinates[0] + lat, coordinates[1] + lon],
      [coordinates[0] - lat, coordinates[1] + lon],
      [coordinates[0] - lat, coordinates[1] - lon]
   ]]);
}