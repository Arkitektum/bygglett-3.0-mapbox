import { Map, NavigationControl } from 'mapbox-gl';

const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export function createMap(container) {
   const map = new Map({
      accessToken: ACCESS_TOKEN,
      container,
      center: [9.57, 59.12],
      zoom: 12,
      style: 'mapbox://styles/mapbox/streets-v12'
   });

   map.addControl(new NavigationControl());

   map.on('load', () => {
      //createWmsLayer(map);
   });

   map.on('style.load', () => {
      createTerrain(map);
      create3dBuildings(map);
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

function createWmsLayer(map) {
   map.addSource('stormflo', {
      type: 'raster',
      tiles: [
         'https://wms.geonorge.no/skwms1/wms.stormflo?&layers=stormflona_intervall20ar&REQUEST=GetMap&SERVICE=WMS&VERSION=1.3.0&crs=EPSG:3857&FORMAT=image/png&STYLES=&TRANSPARENT=true&WIDTH=512&HEIGHT=512&bbox={bbox-epsg-3857}'
      ],
      tileSize: 512,
      minzoom: 14,
      maxzoom: 18
   });

   map.addLayer(
      {
         'id': 'stormflo',
         'type': 'raster',
         'source': 'stormflo',
         'paint': {},
      },
      'building'
   );
}