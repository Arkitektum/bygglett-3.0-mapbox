import { Outlet } from 'react-router-dom'
import  styles from './App.module.scss'
import { NavigationBar } from 'dibk-design'



function App() {
  return (      
    <div className={styles.app}>
         <NavigationBar 
         logoLink="/"
         logoLinkTitle="Gå til forside"
          primaryListItems={[]}
          secondaryListItems={[]}
        />
      <Outlet />
      </div>      
  )
}

export default App
