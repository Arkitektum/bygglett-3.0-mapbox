

import { useEffect, useState } from 'react';
import { useMap } from 'context/MapProvider';
import { useParams } from "react-router-dom";
import { radiansToDegrees } from '@turf/helpers';
import { THREE } from 'threebox-plugin';
import styles from './SidePanel.module.scss'
import { handleObjectDragged } from 'utils/map/building';
import locations from 'data/location.json';



function SidePanel() {
   const { location,building } = useParams();   
   
   const [isActive, setIsActive] = useState(false);
   const { map, getBuilding } = useMap();

   const handleClick = () => {
      setIsActive(current => !current);
   }

   function moveLeft() {
      const hus = getBuilding();
      
      hus.set({ worldTranslate: new THREE.Vector3(.015, 0, 0) });
      handleObjectDragged(hus, map);
   }
   function moveRight() {
      const hus = getBuilding();
      
      hus.set({ worldTranslate: new THREE.Vector3(-.015, 0, 0) });
      handleObjectDragged(hus, map);
   }
   function moveDown() {
      const hus = getBuilding();
      
      hus.set({ worldTranslate: new THREE.Vector3(0, .015, 0) });
      handleObjectDragged(hus, map);
   }

   function moveUp() {
      const hus = getBuilding();
      
      hus.set({ worldTranslate: new THREE.Vector3(0, -.015, 0) });
      handleObjectDragged(hus, map);
   }
   function moveUpward() {
      const hus = getBuilding();
      
      hus.set({ worldTranslate: new THREE.Vector3(0, 0, 0.05) });
      handleObjectDragged(hus, map);
   }
   function moveDownward() {
      const hus = getBuilding();
      
      hus.set({ worldTranslate: new THREE.Vector3(0, 0, -0.05) });
      handleObjectDragged(hus, map);
   }
   function rotateLeft() {
      const hus = getBuilding();
      const degrees = radiansToDegrees(hus.rotation.z);

      hus.setRotation({ z: degrees + 5 });
      handleObjectDragged(hus, map);
   }
   function rotateRight() {
      const hus = getBuilding();
      const degrees = radiansToDegrees(hus.rotation.z);

      hus.setRotation({ z: degrees - 5 });
      handleObjectDragged(hus, map);
   }
   function resetBuilding() {
      const hus = getBuilding();
      hus.setCoords([locations[location].lat, locations[location].long, locations[location].altitude] )
      hus.set({rotation: {x:0,y:0,z:0}})
      handleObjectDragged(hus, map);      
   }
   


   const moveBuilding = (e) => {
      var key_code = e.which || e.KeyCode;
      console.log(e.keyCode);
      switch (key_code) {
         case 37: //left arrow key
                moveLeft();               
                break;
            case 38: //Up arrow key
                moveUp();
                break;
            case 39: //right arrow key
                moveRight();
                break;
            case 40: //down arrow key
                moveDown();
                break;
            case 32: //left arrow key
                rotateLeft();               
                break;
            default: 
               return;
      }
   }
   useEffect(() => {
      document.addEventListener("keydown", moveBuilding);
      return () => document.removeEventListener("keydown", moveBuilding);
   }, [moveBuilding]);
   
 



   return (
      <div className={styles.content}>
         <div className={styles.widthLabel}>
            <label htmlFor="reset">Nullstill visning</label>
            
            <button onClick={resetBuilding} id="reset" className={styles.btn}>
               <div className={styles.reset}></div>
            </button>
         </div>

         <div className={styles.directions}>
            <div>
               <label className={styles.hidden} htmlFor="left">Sør</label>
               <button id="left" onClick={moveRight} className={styles.btn}>
                  <div className={styles.arrow}></div>
               </button>
            </div>
            <div>
               <label className={styles.hidden} htmlFor="up">Nord</label>
               <button id="up" onClick={moveDown} className={styles.btn}>
                  <div className={styles.rotateOnce}>
                     <div className={styles.arrow}></div>
                  </div>
               </button>
            </div>
            <div>
               <label className={styles.hidden} htmlFor="right">Vest</label>
               <button id="right" onClick={moveLeft} className={styles.btn}>
                  <div className={styles.rotateTwice}>
                     <div className={styles.arrow}></div>
                  </div>
               </button>
            </div>
            <div>
               <label className={styles.hidden} htmlFor="down">Øst</label>
               <button id="down" onClick={moveUp} className={styles.btn}>
                  <div className={styles.rotateThird}>
                     <div className={styles.arrow}></div>
                  </div>
               </button>
            </div>
            <div className={styles.house}>
               <div className={styles.house3d}></div>
            </div>
            <div className={styles.label}>Horisontalt</div>
         </div>

         <div className={styles.rotations}>
            <button onClick={rotateLeft} className={styles.left}></button>
            <div className={styles.house3d}></div>
            <button onClick={rotateRight} className={styles.right}></button>
            <div>Rotere</div>
         </div>

         <div className={styles.elevations}>
            <button onClick={moveUpward} className={styles.up}></button>
            <div className={styles.house3d}></div>
            <button onClick={moveDownward} className={styles.down}></button>
            <div>Vertikalt</div>
         </div>
         <div className={styles.spm} onClick={handleClick} >
            <div className={styles.spmIcon}></div>
         </div>

         <div className={isActive ? styles.showInfo : styles.hideInfo}>
            For å flytte på bygningen i kartet så kan dette også gjøres med muspeker. Klikk på bygget så det blir grønt, hold shift tasten inne for å flytte horisontalt. Hold ctr tasten inne for å flytte vertikalt og alt tasten inne for å rotere bygget.
         </div>
      </div>
      
   );
  
}

export default SidePanel