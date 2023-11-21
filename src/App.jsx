import { useEffect, useRef, useState } from 'react'
import styles from './App.module.scss'
import { Map, NavigationControl } from 'mapbox-gl';

const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function App() {
   const mapElementRef = useRef(null);
   const initRef = useRef(true);

   useEffect(
      () => {
         if (!initRef.current) {
            return;
         }

         initRef.current = false;

         const map = new Map({
            accessToken: ACCESS_TOKEN,
            container: mapElementRef.current,
            center: [9.57, 59.12],
            zoom: 12,
            style: 'mapbox://styles/mapbox/streets-v12'
         })

         map.addControl(new NavigationControl());

         map.on('load', () => {
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
         });

         map.on('style.load', () => {
            map.addSource('mapbox-dem', {
               type: 'raster-dem',
               url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
               tileSize: 512,
               maxzoom: 14
            });

            // add the DEM source as a terrain layer with exaggerated height
            map.setTerrain({
               source: 'mapbox-dem',
               exaggeration: 1
            });

            const layers = map.getStyle().layers;
            const labelLayerId = layers.find(layer => layer.type === 'symbol' && layer.layout['text-field']).id;

            // The 'building' layer in the Mapbox Streets
            // vector tileset contains building height data
            // from OpenStreetMap.
            map.addLayer(
               {
                  'id': 'add-3d-buildings',
                  'source': 'composite',
                  'source-layer': 'building',
                  'filter': ['==', 'extrude', 'true'],
                  'type': 'fill-extrusion',
                  'minzoom': 15,
                  'paint': {
                     'fill-extrusion-color': '#aaa',

                     // Use an 'interpolate' expression to
                     // add a smooth transition effect to
                     // the buildings as the user zooms in.
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
         });
      },
      []
   );

   return (
      <div className={styles.container}>
         <div ref={mapElementRef} className={styles.map}></div>
      </div>
   );
}

const style = {
   "version": 8,
   "sources": {
      "osm": {
         "type": "raster",
         "tiles": ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
         "tileSize": 256,
         "attribution": "&copy; OpenStreetMap Contributors",
         "maxzoom": 19
      }
   },
   "layers": [
      {
         "id": "osm",
         "type": "raster",
         "source": "osm"
      }
   ]
};

export default App
