import { useEffect, useRef } from 'react'
import { createMap } from 'utils/map';
import styles from './App.module.scss'

function App() {
   const initRef = useRef(true);
   const mapElementRef = useRef(null);

   useEffect(
      () => {
         if (initRef.current) {
            initRef.current = false;
            createMap(mapElementRef.current);
         }
      },
      []
   );

   return (
      <div className={styles.container}>
         <div ref={mapElementRef} className={styles.map}></div>
      </div>
   );
}

export default App
