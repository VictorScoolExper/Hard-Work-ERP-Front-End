import MainDash from "./pages/MainDash";

import LayoutHR from "./pages/hr/Layout";
import DashboardHR from "./pages/hr/Dashboard";
import EmployeeHR from "./pages/hr/employee/Employee";
import CrewHR from "./pages/hr/crew/Crew";
import AttendanceHR from "./pages/hr/attendance/Attendance";
import ShiftHR from "./pages/hr/attendance/Shift";
import PayrollHR from "./pages/hr/payroll/Payroll";
import ReportHR from "./pages/hr/payroll/Report";

import LayoutAccounting from "./pages/accounting/Layout";
import DashboardAccounting from "./pages/accounting/Dashboard";
import CustomerAccounting from "./pages/accounting/users/Customer";
import EmployeeAccounting from "./pages/accounting/users/Employee";
import VendorAccounting from "./pages/accounting/users/Vendor";
import TransactionDashAcct from "./pages/accounting/transactions/Dashboard";
import ExpenseAccounting from "./pages/accounting/transactions/Expense";
import PurchaseAccounting from "./pages/accounting/transactions/Purchase";
import SaleAccounting from "./pages/accounting/transactions/Sale";
import MainReports from "./pages/accounting/reports/main";
import GeneralSettingsAcct from "./pages/accounting/settings/General_Settings";

import LayoutCRM from "./pages/crm/Layout";
import DashboardCRM from "./pages/crm/Dashboard";
import HelpCRM from "./pages/crm/Help";
import ContactCRM from "./pages/crm/Contact";

import CRM from "./pages/crm/CRM";
import Crew from "./pages/hr/crew/Crew";
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
      <div className="row" style={{ height: "100vh" }}>
        <div className="col-2 p-0">
          <Sidebar width="100%" rootStyles={{ height: "100%" }}>
            <h1 style={{ textAlign: "center" }}>Hard Work ERP</h1>
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
              {/* HR */}
              <SubMenu
                label="HR"
                component={<Link to="/hr" />}
                icon={<i className="bi bi-people-fill"></i>}
              >
                <MenuItem component={<Link to="/hr" />}>Dashboard</MenuItem>
                <MenuItem component={<Link to="/hr/employee" />}>
                  Employee
                </MenuItem>

                <MenuItem component={<Link to="hr/crew" />}>Crew</MenuItem>

                <SubMenu label="Payroll" component={<Link to="/hr/payroll" />}>
                  <MenuItem component={<Link to="hr/payroll" />}>
                    Payroll
                  </MenuItem>
                  <MenuItem component={<Link to="hr/payroll/report" />}>
                    Report
                  </MenuItem>
                </SubMenu>

                <SubMenu label="Attendance" component={<Link to="hr/attend" />}>
                  <MenuItem component={<Link to="hr/attend" />}>
                    Attendance
                  </MenuItem>
                  <MenuItem component={<Link to="hr/shift" />}>Shift</MenuItem>
                </SubMenu>
              </SubMenu>
              {/* CRM */}
              <SubMenu
                label="CRM"
                component={<Link to="/crm" />}
                icon={<i className="bi bi-person-bounding-box"></i>}
              >
                <MenuItem component={<Link to="crm/" />}>Dashboard</MenuItem>
                <MenuItem component={<Link to="crm/contact" />}>
                  Contacts
                </MenuItem>
                <MenuItem component={<Link to="crm/help" />}>Help</MenuItem>
              </SubMenu>
              {/* Accouting */}
              <SubMenu
                label="Accounting"
                component={<Link to="/accounting" />}
                icon={<i className="bi bi-calculator"></i>}
              >
                {/* This is the users section to accounting */}
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
                {/* This is the Transcation to the Users Section */}
                <SubMenu
                  label="Transaction"
                  component={<Link to="/accounting/trans/dash" />}
                >
                  <MenuItem component={<Link to="accounting/trans/expense" />}>
                    Expense
                  </MenuItem>
                  <MenuItem component={<Link to="accounting/trans/sale" />}>
                    Sale
                  </MenuItem>
                  <MenuItem component={<Link to="accounting/trans/purchase" />}>
                    Purchase
                  </MenuItem>
                </SubMenu>
                {/* Report section */}
                <MenuItem component={<Link to="/accounting/report" />}>
                  Report
                </MenuItem>
                {/* Settings Section */}
                <MenuItem component={<Link to="/accounting/setting" />}>
                  Settings
                </MenuItem>
              </SubMenu>
            </Menu>
            <main>
              <button onClick={() => collapseSidebar()}>Collapse</button>
            </main>
          </Sidebar>
        </div>
        <div className="col-10 p-0">
          <Routes>
            <Route exact path="/" element={<MainDash />} />
            <Route path="/hr" element={<LayoutHR />}>
              <Route index element={<DashboardHR />} />
              <Route path="attend" element={<AttendanceHR />} />
              <Route path="shift" element={<ShiftHR />} />
              <Route path="employee" element={<EmployeeHR />} />
              <Route path="crew" element={<CrewHR />} />
              <Route path="payroll" element={<PayrollHR />} />
              <Route path="payroll/report" element={<ReportHR />} />
            </Route>
            <Route path="/accounting" element={<LayoutAccounting />}>
              <Route index element={<DashboardAccounting />} />
              {/* This is the user section */}
              <Route path="user/customer" element={<CustomerAccounting />} />
              <Route path="user/employee" element={<EmployeeAccounting />} />
              <Route path="user/vendor" element={<VendorAccounting />} />
              {/* This is the transaction section */}
              <Route path="trans/dash" element={<TransactionDashAcct />} />
              <Route path="trans/sale" element={<SaleAccounting />} />
              <Route path="trans/expense" element={<ExpenseAccounting />} />
              <Route path="trans/purchase" element={<PurchaseAccounting />} />
              {/* This is the report section */}
              <Route path="report" element={<MainReports />} />
              {/* This is the setting */}
              <Route path="setting" element={<GeneralSettingsAcct />} />
            </Route>
            <Route path="/crm" element={<LayoutCRM />}>
              <Route index element={<DashboardCRM />} />
              <Route path="contact" element={<ContactCRM />} />
              <Route path="help" element={<HelpCRM />} />
            </Route>
            <Route path="crew" element={<Crew />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
