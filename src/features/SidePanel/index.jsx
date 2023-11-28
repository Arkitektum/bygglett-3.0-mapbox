

import { useState } from 'react';
import styles from './SidePanel.module.scss'




function SidePanel() {
    const [isActive, setIsActive] = useState(false)
    const handleClick = event => {
        setIsActive(current => !current);
    }
   return (
      <div className={styles.content}>        
         <div className={styles.widthLabel}>
            <label htmlFor="reset">Nullstill visning</label>
            <button id="reset" className={styles.btn}>
            <div className={styles.reset}></div>
            </button>
         </div>

         <div className={styles.directions}>
            <div>
               <label className={styles.hidden} htmlFor="left">Sør</label>
               <button id="left" className={styles.btn}>
               <div className={styles.arrow}></div>
               </button>
            </div>
            <div>
               <label className={styles.hidden} htmlFor="up">Nord</label>
               <button id="up" className={styles.btn}>
                  <div className={styles.rotateOnce}>
                    <div className={styles.arrow}></div>
                  </div>
               </button>
            </div>
            <div>
               <label className={styles.hidden} htmlFor="right">Vest</label>
               <button id="right" className={styles.btn}>
                  <div className={styles.rotateTwice}>
                  <div className={styles.arrow}></div>
                  </div>
               </button>
            </div>
            <div>
               <label className={styles.hidden} htmlFor="down">Øst</label>
               <button id="down" className={styles.btn}>
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
            <button className={styles.left}></button>
                <div className={styles.house3d}></div>
            <button className={styles.right}></button>
            <div>Rotere</div>
         </div>

         <div className={styles.elevations}>
            <button className={styles.up}></button>
                <div className={styles.house3d}></div>
            <button className={styles.down}></button>
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