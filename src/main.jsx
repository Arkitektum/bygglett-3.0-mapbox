import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import store from "store"
import router from './config/routing.jsx'
import 'styles/styles.scss'
 
const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
   <React.StrictMode>  
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </React.StrictMode>
)
