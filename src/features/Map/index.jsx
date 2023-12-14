import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import MapProvider from 'context/MapProvider';
import MapView from 'features/MapView';

import styles from './Map.module.scss'
import SidePanel from 'features/SidePanel'
import userstory from 'data/location.json'
const locations = {'oslo': [userstory.features[0].properties.locationlat, userstory.features[0].properties.locationlong],'kvam': [userstory.features[1].properties.locationlat, userstory.features[1].properties.locationlong] }

function Map() {
   
   const altitude = 95;
   const { location,building } = useParams();
   const intersection = useSelector(state => state.map.intersection);

   //console.log((userstory.features[0].properties.realestatetotal * userstory.features[0].properties.possible) - userstory.features[0].properties.occupied + 'igjen som kan bygges :)')

   useEffect(
      () => {
         if (intersection !== null) {
           null
         }
      },
      [intersection]
   );

   return (
      <div className={styles.container}>
         <MapProvider location={locations[location]} altitude={altitude} building={building}>
            <div className={styles.sidePanel}>
               <SidePanel />
            </div>
            <div className={styles.mapView}>
               <MapView />
            </div>
         </MapProvider>
      </div>
   );
}

export default Map
