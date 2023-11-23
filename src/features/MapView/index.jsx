import { useEffect, useRef } from 'react'
import { renderToStaticMarkup } from 'react-dom/server';
import { useMap } from 'context/MapProvider';
import { createMap } from 'utils/map/map';
import { getContextType } from 'utils/geolett';
import { Popup } from 'mapbox-gl';
import FeaturePopup from 'components/FeaturePopup';
import styles from './MapView.module.scss'

function MapView() {
   const { setMap, location, altitude, building } = useMap();
   const initRef = useRef(true);
   const mapElementRef = useRef(null);

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
                  new Popup().setLngLat([lng, lat]).setHTML(html).addTo(map);
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
      </div>
   );
}

export default MapView
