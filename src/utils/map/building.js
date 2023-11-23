import booleanIntersects from '@turf/boolean-intersects';
import { getObjectArea } from 'utils/helpers';
import { setIntersection } from 'store/slices/mapSlice';
import store from 'store';

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

            addObjectLayer(map, model);

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
   const source = map.getSource('object-area');

   source.setData(area);

   const features = map.querySourceFeatures('naturtyper-utvalgte', { sourceLayer: 'naturtyper-utvalgte' });
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