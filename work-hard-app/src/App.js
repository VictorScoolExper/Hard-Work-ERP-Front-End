import MainDash from "./pages/MainDash";

import LayoutAccounting from "./pages/accounting/Layout";
import DashboardAccounting from "./pages/accounting/Dashboard";
import CustomerAccounting from "./pages/accounting/users/Customer";
import EmployeeAccounting from "./pages/accounting/users/Employee";
import VendorAccounting from "./pages/accounting/users/Vendor";
import ExpenseAccounting from "./pages/accounting/Expense";
import PurchaseAccounting from "./pages/accounting/Purchase";
import SaleAccounting from "./pages/accounting/Sale";

import LayoutCRM from "./pages/crm/Layout";
import DashboardCRM from "./pages/crm/Dashboard";
import HelpCRM from "./pages/crm/Help";
import ContactCRM from "./pages/crm/Contact";

import CRM from "./pages/CRM";
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
  Link,
} from "react-router-dom";

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
      <div className="row" style={{ height: "100vh"}}>
        <div className="col-2 p-0">
          <Sidebar width="100%"  rootStyles={{ height: "100%" }}>
            <h1 style={{ textAlign: "center" }}>
              Hard Work ERP
            </h1>
            <Menu
              menuItemStyles={{
                button: ({ level, active, disabled }) => {
                  // only apply styles on first level elements of the tree
                  if (level === 0)
                    return {
                      color: disabled ? "#f5d9ff" : "#d359ff",
                      backgroundColor: active ? "#eecef9" : undefined,
                    };
                },
              }}
            >
              <MenuItem
                component={<Link to="/" />}
                icon={<i class="bi bi-speedometer2"></i>}
              >
                Dashboard
              </MenuItem>
              <SubMenu
                label="CRM"
                component={<Link to="/crm" />}
                icon={<i className="bi bi-file-earmark-person"></i>}
              >
                <MenuItem component={<Link to="crm/" />}>Dashboard</MenuItem>
                <MenuItem component={<Link to="crm/contact" />}>
                  Contacts
                </MenuItem>
                <MenuItem component={<Link to="crm/help" />}>Help</MenuItem>
              </SubMenu>
              <SubMenu
                label="Accounting"
                component={<Link to="/accounting" />}
                icon={<i className="bi bi-calculator"></i>}
              >
                <SubMenu
                  label="Users"
                  component={<Link to="/accounting/user/customer" />}
                >
                  <MenuItem component={<Link to="/accounting/user/customer" />}>
                    Customer
                  </MenuItem>
                  <MenuItem component={<Link to="/accounting/user/employee" />}>
                    Employee
                  </MenuItem>
                  <MenuItem component={<Link to="/accounting/user/vendor" />}>
                    Vendor
                  </MenuItem>
                </SubMenu>
                <MenuItem component={<Link to="accounting/expense" />}>
                  Expense
                </MenuItem>
                <MenuItem component={<Link to="accounting/sale" />}>
                  Sale
                </MenuItem>
                <MenuItem component={<Link to="accounting/purchase" />}>
                  Purchase
                </MenuItem>
              </SubMenu>
              <MenuItem> Calendar </MenuItem>
            </Menu>
            <main>
              <button onClick={() => collapseSidebar()}>Collapse</button>
            </main>
          </Sidebar>
        </div>
        <div className="col-10 p-0" >
          <Routes>
            <Route exact path="/" element={<MainDash />} />
            <Route path="/accounting" element={<LayoutAccounting />}>
              <Route index element={<DashboardAccounting />} />
              <Route path="user/customer" element={<CustomerAccounting />} />
              <Route path="user/employee" element={<EmployeeAccounting />} />
              <Route path="user/vendor" element={<VendorAccounting />} />
              <Route path="sale" element={<SaleAccounting />} />
              <Route path="expense" element={<ExpenseAccounting />} />
              <Route path="purchase" element={<PurchaseAccounting />} />
            </Route>
            <Route path="/crm" element={<LayoutCRM />}>
              <Route index element={<DashboardCRM />} />
              <Route path="contact" element={<ContactCRM />} />
              <Route path="help" element={<HelpCRM />} />
            </Route>
            <Route path="crew" element={<Crew />}></Route>

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
