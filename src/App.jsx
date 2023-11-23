import MapProvider from 'context/MapProvider';
import MapView from 'features/MapView';
import styles from './App.module.scss'

function App() {
   const location = [6.014302890886796, 60.265660111660935];
   const altitude = 2;
   const building = 'moderne-hus';

   return (
      <div className={styles.app}>
         <MapProvider location={location} altitude={altitude} building={building}>
            <div className={styles.sidePanel}>
               <h3>Sidepanel</h3>
            </div>

            <div className={styles.mapView}>
               <MapView />
            </div>
         </MapProvider>
      </div>
   );
}

export default App
