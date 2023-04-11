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

          <MenuItem component={<Link to="hr/payroll" />}>Payroll</MenuItem>
        </SubMenu>
        {/* CRM */}
        <SubMenu
          label="CRM"
          icon={<i className="bi bi-person-bounding-box"></i>}
        >
          <MenuItem component={<Link to="crm/" />}>Dashboard</MenuItem>
          <MenuItem component={<Link to="crm/contact" />}>Contacts</MenuItem>
          <MenuItem component={<Link to="crm/help" />}>Help</MenuItem>
        </SubMenu>
        {/* Accouting */}
        <SubMenu label="Accounting" icon={<i className="bi bi-calculator"></i>}>
          <MenuItem component={<Link to="/accounting" />}>Dashboard</MenuItem>
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
            <MenuItem component={<Link to="accounting/trans/reimbursement" />}>
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
            <MenuItem component={<Link to="accounting/setting/chartacct" />}>
              Chart Account
            </MenuItem>
            <MenuItem component={<Link to="accounting/setting/bankacct" />}>
              Bank Account
            </MenuItem>
            <MenuItem component={<Link to="accounting/setting/taxrate" />}>
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
          <MenuItem component={<Link to="serv/service" />}>Service</MenuItem>
          <MenuItem component={<Link to="serv/job" />}>Job</MenuItem>
          <MenuItem component={<Link to="serv/project" />}>Project</MenuItem>
          <MenuItem component={<Link to="serv/report" />}>Report</MenuItem>
        </SubMenu>

        {/* Inventory */}
        <SubMenu
          label="Inventory"
          // component={<Link to="/inventory" />}
          icon={<i className="bi bi-card-checklist"></i>}
        >
          <MenuItem component={<Link to="/inventory" />}>Dashboard</MenuItem>
          <MenuItem component={<Link to="/inventory/equipment" />}>
            Equipment
          </MenuItem>
          <MenuItem component={<Link to="/inventory/lease" />}>Lease</MenuItem>
          <MenuItem component={<Link to="/inventory/fleet" />}>Fleet</MenuItem>
          <MenuItem component={<Link to="/inventory/report" />}>
            Report
          </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default SidebarMenu;
