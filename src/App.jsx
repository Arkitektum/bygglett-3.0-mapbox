import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import MapProvider from 'context/MapProvider';
import MapView from 'features/MapView';
import styles from './App.module.scss'
import SidePanel from 'features/SidePanel'
import logo from 'assets/gfx/logo-dibk.svg';

function App() {
   const location = [6.014302890886796, 60.265660111660935];
   const altitude = 2;
   const building = 'moderne-hus';
   const intersection = useSelector(state => state.map.intersection);

   useEffect(
      () => {
         if (intersection !== null) {
            console.log(intersection);
         }
      },
      [intersection]
   );

   return (
      <div className={styles.app}>
         <div className={styles.banner}>
            <div>
               <img src={logo} alt="Logo" />
            </div> 
         </div>

         <div className={styles.textbox}>
            <p>Demonstrator for plassering av byggninger og påbygg og hva som er mulig innenfor området i kartet.</p>
            <p>For å flytte på bygningen: Klikk på bygningen så rammen blir grønn. Beveg huset med muspeker ved å holde shift-tasten inne. Bygningen kan roteres med å holde alt-tasten inne. Skal du bevege bygning vertikalt så hold ctrl-tasten inne</p>
         </div>

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
      </div>
   );
}

export default App
