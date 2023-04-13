import MainDash from "./pages/MainDash";

import LayoutHR from "./pages/hr/Layout";
import DashboardHR from "./pages/hr/Dashboard";
import EmployeeHR from "./pages/hr/employee/Employee";
import CrewHR from "./pages/hr/crew/Crew";
import AttendanceHR from "./pages/hr/attendance/Attendance";
import PayrollHR from "./pages/hr/payroll/Payroll";
import ReportHR from "./pages/hr/payroll/Report";
import AddEditEmployee from "./pages/hr/employee/pages/AddEditEmployee";
import DetailEmployee from "./pages/hr/employee/pages/DetailEmployee";

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

import { RouterProvider, createBrowserRouter } from "react-router-dom";

// const RoutesAll = () => {
//   return (
//     <Routes>
//       <Route exact path="/" element={<MainDash />} />
//       <Route path="/hr" element={<LayoutHR />}>
//         <Route index element={<DashboardHR />} />
//         <Route path="attend" element={<AttendanceHR />} />
//         <Route path="shift" element={<ShiftHR />} />
//         <Route path="employee" element={<EmployeeHR />} />
//         <Route path="employee/add" element={<AddEditEmployee />} />
//         <Route path="employee/edit/:id" element={<AddEditEmployee />} />
//         <Route path="crew" element={<CrewHR />} />
//         <Route path="payroll" element={<PayrollHR />} />
//         <Route path="payroll/report" element={<ReportHR />} />
//       </Route>
//       <Route path="/accounting" element={<LayoutAccounting />}>
//         <Route index element={<DashboardAccounting />} />
//         {/* This is the user section */}
//         <Route path="user/customer" element={<CustomerAccounting />} />
//         <Route path="user/employee" element={<EmployeeAccounting />} />
//         <Route path="user/vendor" element={<VendorAccounting />} />
//         {/* This is the transaction section */}
//         <Route path="trans/dash" element={<TransactionDashAcct />} />
//         <Route path="trans/sale" element={<SaleAccounting />} />
//         <Route path="trans/expense" element={<ExpenseAccounting />} />
//         <Route path="trans/purchase" element={<PurchaseAccounting />} />
//         <Route path="trans/reimbursement" element={<Reimbursement />} />
//         {/* This is the service section */}
//         <Route path="service" element={<Service />} />
//         {/* This is the report section */}
//         <Route path="report" element={<MainReports />} />
//         {/* Settings Section */}
//         <Route path="setting/bankacct" element={<BankAccount />} />
//         <Route path="setting/chartacct" element={<ChartAccount />} />
//         <Route path="setting/taxrate" element={<TaxRate />} />
//         <Route path="setting/taxpay" element={<TaxPayment />} />
//       </Route>
//       <Route path="/crm" element={<LayoutCRM />}>
//         <Route index element={<DashboardCRM />} />
//         <Route path="contact" element={<ContactCRM />} />
//         <Route path="help" element={<HelpCRM />} />
//       </Route>
//       <Route path="/serv" element={<LayoutServ />}>
//         <Route index element={<DashboardMainServ />} />
//         <Route path="service" element={<ServiceServ />} />
//         <Route path="job" element={<JobServ />} />
//         <Route path="project" element={<ProjectServ />} />
//         <Route path="Report" element={<ReportServ />} />
//       </Route>
//       <Route path="/inventory" element={<LayoutInv />}>
//         <Route index element={<DashboardInv />} />
//         <Route path="equipment" element={<Equipment />} />
//         <Route path="fleet" element={<Fleet />} />
//         <Route path="lease" element={<Lease />} />
//         <Route path="report" element={<ReportInv />} />
//       </Route>
//     </Routes>
//   );
// };

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import Employee from "./pages/hr/employee/Employee";
import DetailAttendance from "./pages/hr/attendance/DetailAttendance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainDash /> },
      // HR section
      {
        path: "hr",
        element: <LayoutHR />,
        children: [
          {
            path: "employee",
            children: [
              { index: true, element: <EmployeeHR /> },
              {
                path: "add",
                element: <AddEditEmployee />,
              },
              {
                path: ":employeeId",
                children: [
                  {
                    index: true,
                    // This should be details
                    element: <DetailEmployee />,
                  },
                  {
                    path: "edit",
                    element: <AddEditEmployee />,
                  },
                ],
              },
            ],
          },
          {
            path: "attend",
            children: [
              {
                index: true,
                element: <AttendanceHR />,
              },
              {
                path: "add",
                element: <DetailAttendance />,
              },
              {
                path: ":attendId",
                children: [
                  {
                    index: true,
                    element: <h1>Hello from attend id</h1>,
                  },
                  {
                    path: "edit",
                    element: <h1>Hello from edit attend</h1>,
                  },
                ],
              },
            ],
          },
          {
            path: "payroll",
            children: [
              {
                index: true,
                element: <PayrollHR />,
              },
              {
                path: "add",
                element: <h1>Add new payroll trans</h1>,
              },
              {
                path: ":payId",
                children: [
                  {
                    index: true,
                    element: <h1>This is the id detail payroll</h1>,
                  },
                  {
                    path: 'edit',
                    element: <h1>This is the edit payroll</h1>
                  }
                ],
              },
            ],
          },
        ],
      },
      // CRM section
      {
        path: 'crm',
        element: <LayoutCRM /> ,
        children: [
          {
            path: 'client',
            children: [
              {
                index: true, 
                element: <h1>Client list</h1>
              },
              {
                path: 'add',
                element: <h1>Add Client</h1>
              },
              {
                path: ':clientId',
                children: [
                  {
                    index: true,
                    element: <h1>Client ID detail section</h1>
                  },
                  {
                    path: 'edit',
                    element: <h1>Client Edit</h1>
                  }
                ]
                
              }
            ]
          },
          {
            path: 'vendor',
            children: [
              {
                index: true,
                element: <h1>This is the vendor list</h1>
              },
              {
                path: 'add',
                element: <h1>Add vendor</h1>
              },
              {
                path:':vendorId',
                children: [
                  {
                    index: true,
                    element: <h1>This is detail vendor id</h1>
                  },
                  {
                    path: 'edit',
                    element: <h1>This is edit vendor by id</h1>
                  }
                ]
              }
            ]
          }
        ]
      }
      

    ],
  },
]);

export default router;
