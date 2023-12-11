import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MapProvider from 'context/MapProvider';
import MapView from 'features/MapView';

import styles from './Map.module.scss'
import SidePanel from 'features/SidePanel'
import userstory from 'data/location.json'

function Map() {
   const location = [userstory.features[0].properties.locationlat, userstory.features[0].properties.locationlong];
   const altitude = 95;
   const building = 'garasje';
   const intersection = useSelector(state => state.map.intersection);

   console.log((userstory.features[0].properties.realestatetotal * userstory.features[0].properties.possible) - userstory.features[0].properties.occupied + 'igjen som kan bygges :)')

   useEffect(
      () => {
         if (intersection !== null) {
            console.log(intersection.properties.opphav);
         }
      },
      [intersection]
   );

   return (
      <div className={styles.container}>
         <MapProvider location={location} altitude={altitude} building={building}>
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
