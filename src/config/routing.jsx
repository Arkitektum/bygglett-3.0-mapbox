import { createBrowserRouter } from 'react-router-dom';
import App from 'App';
import Home from 'features/Home';
import Map from 'features/Map';

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
            path: '/kart',
            element: <Map />,
            index: true,
         }
      ]
   }
]);

export default router;