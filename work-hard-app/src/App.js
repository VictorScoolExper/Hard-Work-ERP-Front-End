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
import Reimbursement from "./pages/accounting/transactions/reimbursement";
import Service from "./pages/accounting/services/service";
import BankAccount from "./pages/accounting/setting/Bank_Account";
import ChartAccount from "./pages/accounting/setting/Chart_Account";
import TaxRate from "./pages/accounting/setting/Tax_Rate";
import TaxPayment from "./pages/accounting/setting/Tax_Payment";
import MainReports from "./pages/accounting/reports/main";

import LayoutCRM from "./pages/crm/Layout";
import DashboardCRM from "./pages/crm/Dashboard";
import HelpCRM from "./pages/crm/Help";
import ContactCRM from "./pages/crm/Contact";

import LayoutServ from "./pages/service/Layout";
import DashboardMainServ from "./pages/service/Dasboard";
import ServiceServ from "./pages/service/service/Service";
import JobServ from "./pages/service/job/job";
import ProjectServ from "./pages/service/project/project";
import ReportServ from "./pages/service/report/Report";

import DashboardInv from "./pages/inventory/Dashboard";
import Equipment from "./pages/inventory/Equipment";
import Fleet from "./pages/inventory/Fleet";
import LayoutInv from "./pages/inventory/Layout";
import Lease from "./pages/inventory/Lease";
import ReportInv from "./pages/inventory/Report";

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
      <div style={{ height: "100vh", display: "flex", flexDirection: "row" }}>
        <div className="p-0">
          <Sidebar width="100%" rootStyles={{ height: "100%" }}>
            <h1 className="m-3" style={{ textAlign: "center" }}>
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
              {/* HR */}
              <SubMenu label="HR" icon={<i className="bi bi-people-fill"></i>}>
                <MenuItem component={<Link to="/hr" />}>Dashboard</MenuItem>
                <MenuItem component={<Link to="/hr/employee" />}>
                  Employee
                </MenuItem>

                <MenuItem component={<Link to="hr/crew" />}>Crew</MenuItem>

                <SubMenu label="Payroll">
                  <MenuItem component={<Link to="hr/payroll" />}>
                    Payroll
                  </MenuItem>
                  <MenuItem component={<Link to="hr/payroll/report" />}>
                    Report
                  </MenuItem>
                </SubMenu>

                <SubMenu label="Attendance">
                  <MenuItem component={<Link to="hr/attend" />}>
                    Attendance
                  </MenuItem>
                  <MenuItem component={<Link to="hr/shift" />}>Shift</MenuItem>
                </SubMenu>
              </SubMenu>
              {/* CRM */}
              <SubMenu
                label="CRM"
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
                icon={<i className="bi bi-calculator"></i>}
              >
                <MenuItem component={<Link to="/accounting" />}>
                  Dashboard
                </MenuItem>
                {/* This is the users section to accounting */}
                <SubMenu label="Users">
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
                <SubMenu label="Transaction">
                  <MenuItem component={<Link to="/accounting/trans/dash" />}>
                    Dashboard
                  </MenuItem>
                  <MenuItem component={<Link to="accounting/trans/expense" />}>
                    Expense
                  </MenuItem>
                  <MenuItem component={<Link to="accounting/trans/sale" />}>
                    Sale
                  </MenuItem>
                  <MenuItem component={<Link to="accounting/trans/purchase" />}>
                    Purchase
                  </MenuItem>
                  <MenuItem
                    component={<Link to="accounting/trans/reimbursement" />}
                  >
                    Reimbursement
                  </MenuItem>
                </SubMenu>

                {/* Report section */}
                <MenuItem component={<Link to="/accounting/report" />}>
                  Report
                </MenuItem>
                {/* This is the Setting section */}
                <SubMenu
                  label="Setting"
                  // component={<Link to="/accounting/setting/chartacct" />}
                >
                  <MenuItem
                    component={<Link to="accounting/setting/chartacct" />}
                  >
                    Chart Account
                  </MenuItem>
                  <MenuItem
                    component={<Link to="accounting/setting/bankacct" />}
                  >
                    Bank Account
                  </MenuItem>
                  <MenuItem
                    component={<Link to="accounting/setting/taxrate" />}
                  >
                    Tax Rate
                  </MenuItem>
                  <MenuItem component={<Link to="accounting/setting/taxpay" />}>
                    Tax Payment
                  </MenuItem>
                </SubMenu>
              </SubMenu>
              {/* Service */}
              <SubMenu
                label="Service"
                // component={<Link to="/serv" />}
                icon={<i className="bi bi-hammer"></i>}
              >
                <MenuItem component={<Link to="serv" />}>Dashboard</MenuItem>
                <MenuItem component={<Link to="serv/service" />}>
                  Service
                </MenuItem>
                <MenuItem component={<Link to="serv/job" />}>Job</MenuItem>
                <MenuItem component={<Link to="serv/project" />}>
                  Project
                </MenuItem>
                <MenuItem component={<Link to="serv/report" />}>
                  Report
                </MenuItem>
              </SubMenu>

              {/* Inventory */}
              <SubMenu
                label="Inventory"
                // component={<Link to="/inventory" />}
                icon={<i className="bi bi-card-checklist"></i>}
              >
                <MenuItem component={<Link to="/inventory" />}>
                  Dashboard
                </MenuItem>
                <MenuItem component={<Link to="/inventory/equipment" />}>
                  Equipment
                </MenuItem>
                <MenuItem component={<Link to="/inventory/lease" />}>
                  Lease
                </MenuItem>
                <MenuItem component={<Link to="/inventory/fleet" />}>
                  Fleet
                </MenuItem>
                <MenuItem component={<Link to="/inventory/report" />}>
                  Report
                </MenuItem>
              </SubMenu>
            </Menu>
            <main>
              <button onClick={() => collapseSidebar()}>Collapse</button>
            </main>
          </Sidebar>
        </div>
        <div className="p-0" style={{flex: "1"}}>
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
              <Route path="trans/reimbursement" element={<Reimbursement />} />
              {/* This is the service section */}
              <Route path="service" element={<Service />} />
              {/* This is the report section */}
              <Route path="report" element={<MainReports />} />
              {/* Settings Section */}
              <Route path="setting/bankacct" element={<BankAccount />} />
              <Route path="setting/chartacct" element={<ChartAccount />} />
              <Route path="setting/taxrate" element={<TaxRate />} />
              <Route path="setting/taxpay" element={<TaxPayment />} />
            </Route>
            <Route path="/crm" element={<LayoutCRM />}>
              <Route index element={<DashboardCRM />} />
              <Route path="contact" element={<ContactCRM />} />
              <Route path="help" element={<HelpCRM />} />
            </Route>
            <Route path="/serv" element={<LayoutServ />}>
              <Route index element={<DashboardMainServ />} />
              <Route path="service" element={<ServiceServ />} />
              <Route path="job" element={<JobServ />} />
              <Route path="project" element={<ProjectServ />} />
              <Route path="Report" element={<ReportServ />} />
            </Route>
            <Route path="/inventory" element={<LayoutInv />}>
              <Route index element={<DashboardInv />} />
              <Route path="equipment" element={<Equipment />} />
              <Route path="fleet" element={<Fleet />} />
              <Route path="lease" element={<Lease />} />
              <Route path="report" element={<ReportInv />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
