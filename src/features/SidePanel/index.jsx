
import styles from './SidePanel.module.scss'
import { Reset, TurnLeft, TurnRight, ArrowBtn } from '../../assets/reset.jsx'


function SidePanel() {
   return (
      <div className={styles.content}>
         <div className={styles.widthLabel}>
            <label htmlFor="reset">Nullstill visning</label>
            <button id="reset" className={styles.btn}>
               <Reset />
            </button>
         </div>

         <div className={styles.directions}>
            <div>
               <label className={styles.hidden} htmlFor="left">Nullstill visning</label>
               <button id="left" className={styles.btn}>
                  <ArrowBtn />
               </button>
            </div>
            <div>
               <label className={styles.hidden} htmlFor="up">Nullstill visning</label>
               <button id="up" className={styles.btn}>
                  <div className={styles.rotateOnce}>
                     <ArrowBtn />
                  </div>
               </button>
            </div>
            <div>
               <label className={styles.hidden} htmlFor="right">Nullstill visning</label>
               <button id="right" className={styles.btn}>
                  <div className={styles.rotateTwice}>
                     <ArrowBtn />
                  </div>
               </button>
            </div>
            <div>
               <label className={styles.hidden} htmlFor="down">Nullstill visning</label>
               <button id="down" className={styles.btn}>
                  <div className={styles.rotateThird}>
                     <ArrowBtn />
                  </div>
               </button>
            </div>
            <div className={styles.house}>
               <img src='/src/assets/gfx/icon-house-3d.svg' />
            </div>
         </div>

         <div className={styles.rotations}>
            <button className={styles.left}></button>
            <div className={styles.house3d}></div>
            <button className={styles.right}></button>
         </div>

         <div className={styles.elevations}>
            <button className={styles.up}></button>
            <div className={styles.house3d}></div>
            <button className={styles.down}></button>
         </div>
      </div>
   );
}

export default SidePanel