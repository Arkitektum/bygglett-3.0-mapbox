import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { renderToStaticMarkup } from 'react-dom/server';
import { useMap } from 'context/MapProvider';
import { createMap } from 'utils/map/map';
import { getContextType } from 'utils/geolett';
import FeaturePopup from 'components/FeaturePopup';
import styles from './MapView.module.scss'
import Realestate from 'features/Realestate';


function MapView() {
   const { setMap, location, altitude, building } = useMap();
   const initRef = useRef(true);
   const mapElementRef = useRef(null);
   const dialog = useSelector(state => state.map.dialog)        
   
 
   useEffect(
      () => {
         if (initRef.current) {
            initRef.current = false;
            const map = createMap(mapElementRef.current, location, altitude, building);

            map.on('click', 'hul-eik', event => {
               const props = event.features[0]?.properties;

               if (!props) {
                  return;
               }

               const { lng, lat } = event.lngLat;
               const contextType = getContextType(type => type.datasett.typeReferanse.kodeverdi === props.utvalgtNaturtypeTekst);
         
               if (contextType !== null) {
                  const html = renderToStaticMarkup(<FeaturePopup contextType={contextType} />);                  
                  document.getElementById('drawer').innerHTML += html;
               }
            })

            setMap(map);
         }         
      },
      [altitude, building, location, setMap]
   );
   return (
      <div className={styles.mapContainer}>
         <div ref={mapElementRef} className={styles.map}></div>
         <div className={styles.infoDrawer} id="drawer">
         <Realestate />                  
         { dialog != null  ? 
            (<div className={styles.content}>
               <h3>{dialog.title} </h3>
               <p>{dialog.body}</p>               
               <strong>{dialog.tiltak}</strong>               
               <p>{dialog.tiltakstekst}</p>                     
               </div>) : null
         }
         </div>
      </div>
   );
}

export default MapView
