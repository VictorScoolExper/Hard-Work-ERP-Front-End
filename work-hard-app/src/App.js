import MainDash from "./pages/MainDash";

import LayoutAccounting from "./pages/accounting/Layout";
import DashboardAccounting from "./pages/accounting/Dashboard";
import Expense from "./pages/accounting/Expense";
import Purchase from "./pages/accounting/Purchase";
import Sale from "./pages/accounting/Sale";

import Crew from "./pages/Crew";
import Fleet from "./pages/Fleet";
import Inventory from "./pages/Inventory";
import Job from "./pages/Job";
import Project from "./pages/Project";
import Settings from "./pages/Settings";
import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Link
} from "react-router-dom";
import CRM from "./pages/CRM";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

function App() {
  const { collapseSidebar } = useProSidebar();
  return (
    <Router>
      {/* <nav>
        <ul>
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/accounting">Accounting</NavLink>
          </li>
          <li>
            <NavLink to="/crew">Crew</NavLink>
          </li>
          <li>
            <NavLink to="/crm">CRM</NavLink>
          </li>
          <li>
            <NavLink to="/fleet">Fleet</NavLink>
          </li>
          <li>
            <NavLink to="/inventory">Inventory</NavLink>
          </li>
          <li>
            <NavLink to="/job">Job</NavLink>
          </li>
          <li>
            <NavLink to="/project">Project</NavLink>
          </li>
          <li>
            <NavLink to="/setting">Setting</NavLink>
          </li>
        </ul>
      </nav> */}
      <div className="row">
        <div className="col-4" style={{ height: "100vh" }}>
          <Sidebar style={{ height: "99%" }}>
            <Menu>
            <MenuItem component={<Link to="/" />} > Dashboard </MenuItem>
              <SubMenu label="Accounting" component={<Link to="/accounting" />} >
                <MenuItem component={<Link to="accounting/expense" />} > Expense </MenuItem>
                <MenuItem component={<Link to="accounting/sale" />} > Sale </MenuItem>
                <MenuItem component={<Link to="accounting/purchase" />} > Purchase </MenuItem>
              </SubMenu>
              <MenuItem> Documentation </MenuItem>
              <MenuItem> Calendar </MenuItem>
            </Menu>
            <main>
              <button onClick={() => collapseSidebar()}>Collapse</button>
            </main>
          </Sidebar>
        </div>
        <div className="col-8">
          <Routes>
            <Route exact path="/" element={<MainDash />} />
            <Route path="/accounting" element={<LayoutAccounting />}>
              <Route index element={<DashboardAccounting />} />
              <Route path="sale" element={<Sale />} />
              <Route path="expense" element={<Expense />} />
              <Route path="purchase" element={<Purchase />} />
            </Route>
            <Route path="crew" element={<Crew />} />
            <Route path="crm" element={<CRM />} />
            <Route path="fleet" element={<Fleet />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="job" element={<Job />} />
            <Route path="project" element={<Project />} />
            <Route path="setting" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
