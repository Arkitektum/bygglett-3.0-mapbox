import { createBrowserRouter, redirect } from 'react-router-dom';
import App from 'App';
import Home from 'features/Home';
import Map from 'features/Map';
import Disclaimer from 'features/Disclaimer'

const router = createBrowserRouter([
   {
      id: 'root',
      element: <App />,
      children: [
         {
            path: '/',
            element: <Home />,
            index: true,
         },
         {
            path: '/kart/:location/:building',
            element: <Map />,
            index: true,            
         },         
         {
         path: '/disclaimer',
         element: <Disclaimer />,         
         index: true,
         },
         {
            path: "*",
            loader: () => redirect("/")
         }
         
      ]
   }
], {
   basename: '/bygglett-3.0-mapbox'
});

export default router;