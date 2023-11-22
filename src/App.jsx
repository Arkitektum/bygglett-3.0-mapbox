import { useEffect, useRef, useState } from 'react'
import { createMap } from 'utils/map/map';
import styles from './App.module.scss'

function App() {
   const initRef = useRef(true);
   const mapElementRef = useRef(null);
   const [map, setMap] = useState(null);

   useEffect(
      () => {
         if (initRef.current) {
            initRef.current = false;
            setMap(createMap(mapElementRef.current));
         }
      },
      []
   );

   function test() {
      const layer = map.getLayer('custom-threebox-model');
      tb.world.children[0].setCoords([6.003962, 60.246443])
   }

   return (
      <div className={styles.container}>
         {/* <button onClick={test}>Test</button> */}
         <div ref={mapElementRef} className={styles.map}></div>
      </div>
   );
}

export default App
