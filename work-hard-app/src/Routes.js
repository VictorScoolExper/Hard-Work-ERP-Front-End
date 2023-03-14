import MainDash from "./sections/MainDash";

import LayoutHR from "./sections/hr/Layout";
import DashboardHR from "./sections/hr/Dashboard";
import EmployeeHR from "./sections/hr/employee/Employee";
import CrewHR from "./sections/hr/crew/Crew";
import AttendanceHR from "./sections/hr/attendance/Attendance";
import ShiftHR from "./sections/hr/attendance/Shift";
import PayrollHR from "./sections/hr/payroll/Payroll";
import ReportHR from "./sections/hr/payroll/Report";
import AddEditEmployee from "./sections/hr/employee/pages/AddEditEmployee";

import LayoutAccounting from "./sections/accounting/Layout";
import DashboardAccounting from "./sections/accounting/Dashboard";
import CustomerAccounting from "./sections/accounting/users/Customer";
import EmployeeAccounting from "./sections/accounting/users/Employee";
import VendorAccounting from "./sections/accounting/users/Vendor";
import TransactionDashAcct from "./sections/accounting/transactions/Dashboard";
import ExpenseAccounting from "./sections/accounting/transactions/Expense";
import PurchaseAccounting from "./sections/accounting/transactions/Purchase";
import SaleAccounting from "./sections/accounting/transactions/Sale";
import Reimbursement from "./sections/accounting/transactions/reimbursement";
import Service from "./sections/accounting/services/service";
import BankAccount from "./sections/accounting/setting/Bank_Account";
import ChartAccount from "./sections/accounting/setting/Chart_Account";
import TaxRate from "./sections/accounting/setting/Tax_Rate";
import TaxPayment from "./sections/accounting/setting/Tax_Payment";
import MainReports from "./sections/accounting/reports/main";

import LayoutCRM from "./sections/crm/Layout";
import DashboardCRM from "./sections/crm/Dashboard";
import HelpCRM from "./sections/crm/Help";
import ContactCRM from "./sections/crm/Contact";

import LayoutServ from "./sections/service/Layout";
import DashboardMainServ from "./sections/service/Dasboard";
import ServiceServ from "./sections/service/service/Service";
import JobServ from "./sections/service/job/job";
import ProjectServ from "./sections/service/project/project";
import ReportServ from "./sections/service/report/Report";

import DashboardInv from "./sections/inventory/Dashboard";
import Equipment from "./sections/inventory/Equipment";
import Fleet from "./sections/inventory/Fleet";
import LayoutInv from "./sections/inventory/Layout";
import Lease from "./sections/inventory/Lease";
import ReportInv from "./sections/inventory/Report";

import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";

const RoutesAll = () => {
  return (
    <Routes>
      <Route exact path="/" element={<MainDash />} />
      <Route path="/hr" element={<LayoutHR />}>
        <Route index element={<DashboardHR />} />
        <Route path="attend" element={<AttendanceHR />} />
        <Route path="shift" element={<ShiftHR />} />
        <Route path="employee" element={<EmployeeHR />} />
        <Route path="employee/add" element={<AddEditEmployee />} />
        <Route path="employee/edit/:id" element={<AddEditEmployee />} />
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
  );
};

export default RoutesAll;
