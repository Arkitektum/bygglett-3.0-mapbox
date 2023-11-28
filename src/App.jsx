import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MapProvider from 'context/MapProvider';
import MapView from 'features/MapView';
import styles from './App.module.scss'
import SidePanel from 'features/SidePanel'
import logo from 'assets/gfx/logo-dibk.svg';
import userstory from 'data/location.json'

function App() {
   const location = [userstory.features[0].properties.locationlat,  userstory.features[0].properties.locationlong];   
   const altitude = 95;
   const building = 'garasje';
   const intersection = useSelector(state => state.map.intersection);  

   useEffect(
      () => {
         if (intersection !== null) {
            console.log(intersection.properties.opphav);                        
         }
      },
      [intersection]
   );
   console.log((userstory.features[0].properties.realestatetotal * userstory.features[0].properties.possible) - userstory.features[0].properties.occupied + 'igjen som kan bygges :)')
   return ( 
      <div className={styles.app}>
         <div className={styles.banner}>
            <div>
                 <img src={logo} alt="Logo" />
                 
            </div> 
         </div>

         <div className={styles.container}>
            <MapProvider location={location} altitude={altitude} building={building}>

               <div className={styles.sidePanel}>
                  <SidePanel />
               </div>
               <div className={styles.mapView}>
                 { intersection !== null ? 

                 <div className={styles.staticDialog}>
                     {intersection?.properties.opphav}                  
                  </div> : null
                  }
                  <MapView />
               </div>
            </MapProvider>
            </div>
      </div>

   );
}

export default App
