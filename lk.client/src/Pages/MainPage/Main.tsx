import HeaderMainPage from "./HeaderMainPage"
import "./Menu.css"
import Menu from "./Menu"
import { useState, useCallback, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom';


function Main () {
  const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = useCallback((open: boolean) => () => {
        setIsOpen(open);
    }, []);

    const location = useLocation();

    useEffect(() => setIsOpen(false), [location])

  return (
    <>
      
      <HeaderMainPage toggleDrawer={toggleDrawer} />
      <Menu isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <main>
        <Outlet />
      </main>
      <footer>{import.meta.env.VITE_VERSION}</footer>  
    </>
      
      

  );
}


export default Main
