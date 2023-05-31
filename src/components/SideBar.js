import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../features/auth/authSlice";

import { Link } from "react-router-dom";

import { EncapsulatedMenuItems, BottomButton } from "./SideBar.style";

const SidebarMenu = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { collapseSidebar } = useProSidebar();

  const error = useSelector(state => state.auth.error);

  const handleLogout = async () => {
    try {
      await  dispatch(logoutUser())
      navigate("/auth")
      
    } catch (error) {
      console.log('This is the error: ' + error)
    } 
  };

  return (
    <Sidebar width="100%" rootStyles={{ height: "100vh" }}>
      <EncapsulatedMenuItems>
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
            icon={<i className="bi bi-list"></i>}
            onClick={() => collapseSidebar()}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2 style={{ margin: "2px", fontSize: "100%" }}>Green Work</h2>
          </MenuItem>

          <div style={{ height: "30px" }}></div>
          {/* The Add new Section */}
          <SubMenu label="New" icon={<i className="bi bi-plus-circle"></i>}>
            <SubMenu label="Customers">
              <MenuItem>Invoice</MenuItem>
              <MenuItem>Receive Payments</MenuItem>
              <MenuItem>Estimate</MenuItem>
              <MenuItem>Sales Receipt</MenuItem>
              <MenuItem>Refund Receipt</MenuItem>
            </SubMenu>
            <SubMenu label="Vendor">
              <MenuItem>Expense</MenuItem>
              <MenuItem>Check</MenuItem>
              <MenuItem>Bill</MenuItem>
              <MenuItem>Pay Bills</MenuItem>
            </SubMenu>
            <SubMenu label="Employees">
              <MenuItem>Single Time Activity</MenuItem>
              <MenuItem>Weekly Timesheet</MenuItem>
            </SubMenu>
            <SubMenu label="Other">
              <MenuItem>Bank Deposit</MenuItem>
              <MenuItem>Transfer</MenuItem>
              <MenuItem>Journal Entry</MenuItem>
              <MenuItem>Inventory Adjustment</MenuItem>
              <MenuItem>Pay down Credit Card</MenuItem>
            </SubMenu>
          </SubMenu>

          <div style={{ height: "30px" }}></div>

          <MenuItem
            component={<Link to="/" />}
            icon={<i className="bi bi-speedometer2"></i>}
          >
            Dashboard
          </MenuItem>
          {/* HR */}
          <SubMenu label="HR" icon={<i className="bi bi-people-fill"></i>}>
            <MenuItem component={<Link to="/hr/employee" />}>Employee</MenuItem>

            <MenuItem component={<Link to="/hr/attend" />}>Attendance</MenuItem>

            <MenuItem component={<Link to="/hr/payroll" />}>Payroll</MenuItem>
          </SubMenu>
          {/* CRM */}
          <SubMenu
            label="CRM"
            icon={<i className="bi bi-person-bounding-box"></i>}
          >
            <MenuItem component={<Link to="crm/client" />}>Clients</MenuItem>
            <MenuItem component={<Link to="crm/vendor" />}>Vendors</MenuItem>
            <MenuItem component={<Link to="crm/company" />}>Companies</MenuItem>
          </SubMenu>
          {/* Accouting */}
          <SubMenu
            label="Accounting"
            icon={<i className="bi bi-calculator"></i>}
          >
            <MenuItem component={<Link to="/acct" />}>Dashboard</MenuItem>
            {/* This is the users section to accounting */}
            <SubMenu label="Banking">
              <MenuItem component={<Link to="/acct/banking" />}>
                Banking
              </MenuItem>
              <MenuItem component={<Link to="/acct/banking/receipt" />}>
                Receipts
              </MenuItem>
            </SubMenu>
            {/* This is the Transcation to the Users Section */}
            <SubMenu label="Sale">
              <MenuItem component={<Link to="/acct/sale/overview" />}>
                Overview
              </MenuItem>
              <MenuItem component={<Link to="/acct/sale" />}>
                All Sales
              </MenuItem>
              <MenuItem component={<Link to="/acct/invoice" />}>
                Invoices
              </MenuItem>
              <MenuItem component={<Link to="/acct/estimate" />}>
                Estimates
              </MenuItem>
              <MenuItem component={<Link to="/acct/customers" />}>
                Customers
              </MenuItem>
              <MenuItem component={<Link to="/acct/service" />}>
                Services
              </MenuItem>
            </SubMenu>
            {/* Expense section */}
            <SubMenu label="Expenses">
              <MenuItem component={<Link to="/acct/expense" />}>
                Expenses
              </MenuItem>
              <MenuItem component={<Link to="/acct/bill" />}>Bills</MenuItem>
              <MenuItem component={<Link to="/acct/vendor" />}>
                Vendors
              </MenuItem>
            </SubMenu>
            {/* Report section */}
            <MenuItem component={<Link to="/acct/report" />}>Report</MenuItem>
            {/* This is the Setting section */}
            <SubMenu label="Taxes">
              <MenuItem component={<Link to="/acct/saletax" />}>
                Sales Tax
              </MenuItem>
              <MenuItem component={<Link to="/acct/file1099" />}>
                1099 filing
              </MenuItem>
            </SubMenu>
            {/* Payroll */}
            <MenuItem component={<Link to="/acct/payroll" />}>Payroll</MenuItem>
            <MenuItem component={<Link to="/acct/mileage" />}>Mileage</MenuItem>
          </SubMenu>
          {/* Service */}
          <SubMenu label="Services" icon={<i className="bi bi-hammer"></i>}>
            <MenuItem component={<Link to="/service/dash" />}>Dashboard</MenuItem>
            <MenuItem component={<Link to="/service" />}>
              Service
            </MenuItem>
          </SubMenu>

          {/* Inventory */}
          <SubMenu
            label="Inventory"
            // component={<Link to="/inventory" />}
            icon={<i className="bi bi-card-checklist"></i>}
          >
            <MenuItem component={<Link to="/inventory" />}>Overview</MenuItem>
            <MenuItem component={<Link to="/inventory/equipment" />}>
              Equipment
            </MenuItem>
            <MenuItem component={<Link to="/inventory/fleet" />}>
              Fleet
            </MenuItem>
            <MenuItem component={<Link to="/inventory/supply" />}>
              Supplies
            </MenuItem>
          </SubMenu>
        </Menu>

        <Menu>
          <BottomButton
            icon={<i className="bi bi-box-arrow-right"></i>}
            className="bottom-button"
            onClick={handleLogout}
          >
            Logout
          </BottomButton>
        </Menu>
      </EncapsulatedMenuItems>
    </Sidebar>
  );
};

export default SidebarMenu;
