import { createContext, useContext, useState } from 'react';

export default function MapProvider({ location, altitude, building, children }) {
   const [map, setMap] = useState(null);

   return (
      <MapContext.Provider value={{ map, setMap, location, altitude, building }}>
         {children}
      </MapContext.Provider>
   );
}

export const MapContext = createContext({});
export const useMap = () => useContext(MapContext);