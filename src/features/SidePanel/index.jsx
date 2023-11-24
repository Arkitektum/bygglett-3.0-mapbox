

import styles from './SidePanel.module.scss'





function SidePanel() {
    
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
               <label className={styles.hidden} htmlFor="left">Nullstill visning</label>
               <button id="left" className={styles.btn}>
               <div className={styles.arrow}></div>
               </button>
            </div>
            <div>
               <label className={styles.hidden} htmlFor="up">Nullstill visning</label>
               <button id="up" className={styles.btn}>
                  <div className={styles.rotateOnce}>
                    <div className={styles.arrow}></div>
                  </div>
               </button>
            </div>
            <div>
               <label className={styles.hidden} htmlFor="right">Nullstill visning</label>
               <button id="right" className={styles.btn}>
                  <div className={styles.rotateTwice}>
                  <div className={styles.arrow}></div>
                  </div>
               </button>
            </div>
            <div>
               <label className={styles.hidden} htmlFor="down">Nullstill visning</label>
               <button id="down" className={styles.btn}>
                  <div className={styles.rotateThird}>
                  <div className={styles.arrow}></div>
                  </div>
               </button>
            </div>
            <div className={styles.house}>
                <div className={styles.house3d}></div>
            </div>
            <div className={styles.label}>Flytte bygningen</div>
         </div>

         <div className={styles.rotations}>
            <button className={styles.left}></button>
                <div className={styles.house3d}></div>
            <button className={styles.right}></button>
            <div>Rotere bygningen</div>
         </div>

         <div className={styles.elevations}>
            <button className={styles.up}></button>
                <div className={styles.house3d}></div>
            <button className={styles.down}></button>
            <div>Heve/Senke bygningen</div>
         </div>
         <div className={styles.spm}>
            <div className={styles.spmIcon}></div>
            
            
         </div>

        

      </div>
      
   );
}

export default SidePanel