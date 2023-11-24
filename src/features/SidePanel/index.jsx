
import styles from './SidePanel.module.scss'
import { Reset,TurnLeft,TurnRight,ArrowBtn } from '../../assets/reset.jsx'


function SidePanel () {
    return (
        <div className={styles.content}>
            <div className={styles.widthLabel}>
                <label for="reset">Nullstill visning</label>
                <button id="reset" className={styles.btn}>           
                    <Reset />           
                </button>           
           </div>
           
            <div className={styles.directions}>
                <div>  
                    <label className={styles.hidden} for="left">Nullstill visning</label>
                    <button id="left" className={styles.btn}>           
                        <ArrowBtn />           
                    </button>
                </div>
                <div>
                    <label className={styles.hidden} for="up">Nullstill visning</label>            
                    <button id="up" className={styles.btn}>           
                        <div className={styles.rotateOnce}>
                            <ArrowBtn />
                        </div>
                    </button>
                </div>
                <div>
                    <label className={styles.hidden} for="right">Nullstill visning</label>
                    <button id="right" className={styles.btn}>           
                    <div className={styles.rotateTwice}>
                            <ArrowBtn />
                        </div>        
                    </button>
                </div>
                <div>
                    <label className={styles.hidden} for="down">Nullstill visning</label>
                    <button id="down" className={styles.btn}>           
                    <div className={styles.rotateThird}>
                            <ArrowBtn />
                        </div>          
                    </button>   
                </div>
                <div className={styles.house}>
                    <img src='/src/assets/3dhouse.svg' />
                </div>
            </div>        

            <div className={styles.rotations}>
                <label className={styles.hidden} for="roterH">Nullstill visning</label>
                <button id="roterH" className={styles.btn}>  
                <div className={styles.rotateIcon}>         
                    <TurnLeft />           
                    </div>
                </button>
                
                <div className={styles.house}>
                        <img src='/src/assets/3dhouse.svg' />
                    </div>
                <label className={styles.hidden} for="roterV">Nullstill visning</label>
                <button id="roterV" className={styles.btn}>  
                <div className={styles.rotateIcon}>                         
                    <TurnRight />           
                </div>
                </button>          
            </div>

            <div className={styles.elevations}>
                <label className={styles.hidden} for="up-elevation">Nullstill visning</label>
                <button id="up-elevation" className={styles.btn}>           
                    <div className={styles.rotateThird}>
                        <ArrowBtn />
                    </div>                     
                </button>
                
                <div className={styles.house}>
                        <img src='/src/assets/3dhouse.svg' />
                    </div>
                <label className={styles.hidden} for="down-elevation">Nullstill visning</label>
                <button id="down-elevation" className={styles.btn}>           
                    <div className={styles.rotateOnce}>
                        <ArrowBtn />
                    </div>                   
                </button>          
            </div>

        </div>
     );
    
}
export default SidePanel