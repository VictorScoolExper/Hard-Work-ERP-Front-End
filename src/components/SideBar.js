import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

import { Link } from "react-router-dom";

const SidebarMenu = () => {
  const { collapseSidebar } = useProSidebar();
  return (
    <Sidebar width="100%" rootStyles={{ height: "100%" }}>
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
          <h2 style={{ margin: "2px" }}>Work Hard ERP</h2>
        </MenuItem>

        <div style={{height: '30px'}}></div>
        {/* The Add new Section */}
        <SubMenu 
          label="New"
          icon={<i class="bi bi-plus-circle"></i>}
        >
          <SubMenu label="Customers">
            <MenuItem>
              Invoice 
            </MenuItem>
            <MenuItem>
              Receive Payments
            </MenuItem>
            <MenuItem>
              Estimate
            </MenuItem>
            <MenuItem>
              Sales Receipt
            </MenuItem>
            <MenuItem>
              Refund Receipt
            </MenuItem>
          </SubMenu>
          <SubMenu label="Vendor">
            <MenuItem>
              Expense
            </MenuItem>
            <MenuItem>
              Check
            </MenuItem>
            <MenuItem>
              Bill
            </MenuItem>
            <MenuItem>
              Pay Bills
            </MenuItem>
          </SubMenu>
          <SubMenu label="Employees">
            <MenuItem>
              Single Time Activity
            </MenuItem>
            <MenuItem>
              Weekly Timesheet
            </MenuItem>
          </SubMenu>
          <SubMenu label="Other">
            <MenuItem>
              Bank Deposit
            </MenuItem>
            <MenuItem>
              Transfer
            </MenuItem>
            <MenuItem>
              Journal Entry
            </MenuItem>
            <MenuItem>
              Inventory Adjustment
            </MenuItem>
            <MenuItem>
              Pay down Credit Card
            </MenuItem>
          </SubMenu>
        </SubMenu>


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
        </SubMenu>
        {/* Accouting */}
        <SubMenu label="Accounting" icon={<i className="bi bi-calculator"></i>}>
          <MenuItem component={<Link to="/accounting" />}>Dashboard</MenuItem>
          {/* This is the users section to accounting */}
          <SubMenu label="Banking">
            <MenuItem component={<Link to="" />}>Banking</MenuItem>
            <MenuItem component={<Link to="" />}>Receipts</MenuItem>
          </SubMenu>
          {/* This is the Transcation to the Users Section */}
          <SubMenu label="Sale">
            <MenuItem component={<Link to="" />}>Overview</MenuItem>
            <MenuItem component={<Link to="" />}>All Sales</MenuItem>
            <MenuItem component={<Link to="" />}>Invoices</MenuItem>
            <MenuItem component={<Link to="" />}>Estimates</MenuItem>
            <MenuItem component={<Link to="" />}>Customers</MenuItem>
            <MenuItem component={<Link to="" />}>Services</MenuItem>
          </SubMenu>
          {/* Expense section */}
          <SubMenu label="Expenses">
            <MenuItem component={<Link to="" />}>Expenses</MenuItem>
            <MenuItem component={<Link to="" />}>Bills</MenuItem>
            <MenuItem component={<Link to="" />}>Vendors</MenuItem>
          </SubMenu>
          {/* Report section */}
          <MenuItem component={<Link to="/accounting/report" />}>
            Report
          </MenuItem>
          {/* This is the Setting section */}
          <SubMenu label="Taxes">
            <MenuItem component={<Link to="" />}>Sales Tax</MenuItem>
            <MenuItem component={<Link to="" />}>1099 filing</MenuItem>
          </SubMenu>
          {/* Payroll */}
          <MenuItem component={<Link to="" />}>
            Payroll
          </MenuItem>
          <MenuItem component={<Link to="" />}>
            Mileage
          </MenuItem>
        </SubMenu>
        {/* Service */}
        <SubMenu
          label="Management"
          icon={<i className="bi bi-hammer"></i>}
        >
          <MenuItem component={<Link to="serv" />}>Dashboard</MenuItem>
          <MenuItem component={<Link to="serv/service" />}>Service</MenuItem>
          <MenuItem component={<Link to="serv/project" />}>Project</MenuItem>
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
          <MenuItem component={<Link to="/inventory/fleet" />}>Fleet</MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default SidebarMenu;
