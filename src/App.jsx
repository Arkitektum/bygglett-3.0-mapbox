import { Outlet } from 'react-router-dom'
import styles from './App.module.scss'
import { NavigationBar, Footer } from 'dibk-design'

function App() {
  return (      
    <div className={styles.app}>
         <NavigationBar 
         logoLink="/"
         logoLinkTitle="Gå til forside"
          primaryListItems={[]}
          secondaryListItems={[]}
        >
           <span>
            NB! Betaversjon av demonstrator - kun ment for test av funksjonalitet og ulike scenario
          </span>
        </NavigationBar>       
      <Outlet />
      <Footer>
          <span>
           <a href="/Disclaimer">Disclaimer</a>
          </span>
        </Footer>
      
      </div>      
  )
}

export default App
