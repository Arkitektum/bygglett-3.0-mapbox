import { createContext, useContext, useRef, useState } from 'react';

export default function MapProvider({ location, altitude, building, children }) {
   const [map, setMap] = useState(null);
   const buildingRef = useRef(null);

   function getBuilding() {
      return buildingRef.current;
   }

   function setBuilding(model) {
      buildingRef.current = model;
   }

   return (
      <MapContext.Provider value={{ map, setMap, getBuilding, setBuilding, location, altitude, building }}>
         {children}
      </MapContext.Provider>
   );
}

export const MapContext = createContext({});
export const useMap = () => useContext(MapContext);