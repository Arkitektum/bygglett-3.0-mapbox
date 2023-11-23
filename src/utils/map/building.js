import booleanIntersects from "@turf/boolean-intersects";
import { getObjectArea } from "utils/helpers";

export function createBuilding(map, location, altitude, building) {
   map.addLayer({
      id: 'building-bygglett',
      type: 'custom',
      renderingMode: '3d',
      onAdd: () => {
         const scale = 1;

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

               console.log(features.length)
               console.log('Intersects: ', features.find(feature => booleanIntersects(feature.geometry, area))?.properties);

               const source = map.getSource('object-area');
               source.setData(area)
               
            }, false);

            window.tb.add(model);
         });
      },

      render: function () {
         window.tb.update();
      }
   });
}