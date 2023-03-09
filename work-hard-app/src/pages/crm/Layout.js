import { Outlet, Link } from "react-router-dom";

const Layout = () =>{
    return (
        <>
          <nav>
            <ul>
              <li>
                <Link to="/crm">Overview</Link>
              </li>
              <li>
                <Link to="/crm/contact">Contacts</Link>
              </li>
              <li>
                <Link to="/crm/help">Help</Link>
              </li>
            </ul>
          </nav>
    
          <Outlet />
        </>
      )
};  

export default Layout;