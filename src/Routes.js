import MainDash from "./root-pages/MainDash";

// Root layout
import RootLayout from "./root-pages/Root";
import HRLayout from "./root-pages/HRLayout";
import LayoutAccounting from "./root-pages/AccountingLayout";
import LayoutCRM from "./root-pages/CRMLayout";
import LayoutServ from "./root-pages/ServiceLayout";
import LayoutInv from "./root-pages/InventoryLayout";

// Pages
import LoginPage from './features/auth/LoginPage';
import ErrorPage from "./root-pages/Error";
import EmployeePage from "./features/employees/EmployeePage";
import EmployeeAddForm from "./features/employees/EmployeeAddForm";
import EmployeeEditForm from "./features/employees/EmployeeEditForm";
import DetailEmployee from "./features/employees/DetailEmployeePage";

import ClientPage from "./features/clients/ClientPage";
import ClientForm from "./features/clients/ClientForm";
import ClientDetailPage from "./features/clients/ClientDetailPage";
import ClientEditForm from "./features/clients/ClientEditForm";

import ClientAddressEdit from "./features/clients/ClientAddressEdit";
import CompanyPage from "./features/companies/CompanyPage";
import CompanyForm from "./features/companies/CompanyForm";

import { createBrowserRouter } from "react-router-dom";
import {checkUserLogged} from "./util/auth";
import VendorForm from "./features/vendor/VendorForm";
import VendorPage from "./features/vendor/VendorPage";

import ServicePage from "./features/services/ServicePage";
import ServiceForm from "./features/services/ServiceForm";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <LoginPage/>
  },
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: checkUserLogged,
    children: [
      { index: true, element: <MainDash /> },
      // HR section
      {
        path: "hr",
        element: <HRLayout />,
        children: [
          {
            path: "employee",
            children: [
              { 
                index: true, 
                element: <EmployeePage />
              },
              {
                path: "add",
                element: <EmployeeAddForm />,
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
                    element: <EmployeeEditForm />,
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
                element: <h1>This is the main attendance page</h1>,
              },
              {
                path: "add",
                element: <h1>Add new attendance registration</h1>,
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
                element: <h1>Main Payroll section</h1>,
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
                    path: "edit",
                    element: <h1>This is the edit payroll</h1>,
                  },
                ],
              },
            ],
          },
        ],
      },
      // CRM section
      {
        path: "crm",
        element: <LayoutCRM />,
        children: [
          {
            path: "client",
            children: [
              {
                index: true,
                element: <ClientPage />,
              },
              {
                path: "add",
                element: <ClientForm /> ,
              },
              {
                path: ":clientId",
                children: [
                  {
                    index: true,
                    element: <ClientDetailPage />,
                  },
                  {
                    path: "edit",
                    element: <ClientEditForm />,
                  },
                  {
                    path: "edit/address/:addressId",
                    element: <ClientAddressEdit />
                  }
                ],
              },
            ],
          },
          {
            path: "vendor",
            children: [
              {
                index: true,
                element: <VendorPage />,
              },
              {
                path: "add",
                element: <VendorForm />,
              },
              {
                path: ":vendorId",
                children: [
                  {
                    index: true,
                    element: <VendorForm />,
                  },
                  {
                    path: "edit",
                    element: <VendorForm />,
                  },
                ],
              },
            ],
          },
          {
            path: "company",
            children: [
              {
                index: true,
                element: <CompanyPage />
              },
              {
                path: "add",
                element: <CompanyForm />,
              },
              {
                path: ":companyId",
                children: [
                  {
                    index: true,
                    element: <CompanyForm />,
                  },
                  {
                    path: "edit",
                    element: <CompanyForm />,
                  },
                ],
              },
            ]
          }
        ],
      },
      // Accounting section
      {
        path: "acct",
        element: <LayoutAccounting />,
        children: [
          {
            index: true,
            element: <h1>This is the accounting dashboard</h1>,
          },
          // Accounting  Banking Section
          {
            path: "banking",
            children: [
              {
                index: true,
                element: <h1>Banking All Accounts</h1>,
              },
              {
                path: "receipt",
                children: [
                  {
                    index: true,
                    element: <h1>This is to view all reciept</h1>,
                  },
                  {
                    path: "add",
                    element: <h1>Add reciept</h1>,
                  },
                  {
                    path: ":recieptId",
                    children: [
                      {
                        index: true,
                        element: <h1>Receipt Detail Id</h1>,
                      },
                      {
                        path: "edit",
                        element: <h1>Edit Receipt by Id</h1>,
                      },
                    ],
                  },
                ],
              },
              {
                path: ":bankId",
                children: [
                  {
                    index: true,
                    element: <h1>This bank Account details</h1>,
                  },
                  {
                    path: "edit",
                    element: <h1>This edits bank accounts details</h1>,
                  },
                  {
                    path: "trans/:transId",
                    children: [
                      {
                        index: true,
                        element: (
                          <h1>This is a single bank transaction detail</h1>
                        ),
                      },
                      {
                        path: "edit",
                        element: <h1>Banking transaction edit by id</h1>,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // Accounting Sales Section
          {
            path: "sale",
            children: [
              {
                index: true,
                element: <h1>This is the list of sales</h1>,
              },
              {
                path: "overview",
                element: <h1>This is the overview section</h1>,
              },
              {
                path: "add",
                element: <h1>Add Sale</h1>,
              },
              {
                path: ":saleId",
                children: [
                  {
                    index: true,
                    element: <h1>This is the sale id details</h1>,
                  },
                  {
                    path: "edit",
                    element: <h1>This is the sale id edit page</h1>,
                  },
                ],
              },
            ],
          },
          {
            path: "invoice",
            children: [
              {
                index: true,
                element: <h1>List of invoices</h1>,
              },
              {
                path: "add",
                element: <h1>This is to add invoices</h1>,
              },
              {
                path: ":invoiceId",
                children: [
                  {
                    index: true,
                    element: <h1>This is invoice Details</h1>,
                  },
                  {
                    path: "edit",
                    element: <h1>This is the edit invoice by id</h1>,
                  },
                ],
              },
            ],
          },
          // Accounting estimate section
          {
            path: "estimate",
            children: [
              {
                index: true,
                element: <h1>List of Estimates created</h1>,
              },
              {
                path: "add",
                element: <h1>Add estimate</h1>,
              },
              {
                path: ":estimateId",
                children: [
                  {
                    index: true,
                    element: <h1>This is the estimate id details</h1>,
                  },
                  {
                    path: "edit",
                    element: <h1>This is the estimate edit page</h1>,
                  },
                ],
              },
            ],
          },
          // Accounting Customer section
          {
            path: "customers",
            children: [
              {
                index: true,
                element: <h1>List of Customers</h1>,
              },
              {
                path: ":customerId",
                children: [
                  {
                    index: true,
                    element: <h1>Customer details</h1>,
                  },
                  {
                    path: "trans",
                    element: <h1>The list of transactons</h1>,
                  },
                ],
              },
            ],
          },
          // Accounting Service section
          {
            path: "service",
            children: [
              {
                index: true,
                element: <h1>Service Page in accounting</h1>,
              },
              {
                path: "add",
                element: <h1>Add a Service section</h1>,
              },
              {
                path: ":serviceId",
                children: [
                  {
                    index: true,
                    element: <h1>Service Details by id</h1>,
                  },
                  {
                    path: "edit",
                    element: <h1>Edit the service by id</h1>,
                  },
                ],
              },
            ],
          },
          // Accounting Expense Section
          {
            path: "expense",
            children: [
              {
                index: true,
                element: <h1>The list of expenses</h1>,
              },
              {
                path: "add",
                element: <h1>Add new Expense</h1>,
              },
              {
                path: ":expenseId",
                children: [
                  {
                    index: true,
                    element: <h1>This is the expense by id detail</h1>,
                  },
                  {
                    path: "edit",
                    element: <h1>This edit expense by id</h1>,
                  },
                ],
              },
            ],
          },
          // Accounting Bill Section
          {
            path: "bill",
            children: [
              {
                index: true,
                element: <h1>List bill section for accounting</h1>,
              },
              {
                path: "add",
                element: <h1>Add Bill</h1>,
              },
              {
                path: ":billId",
                children: [
                  {
                    index: true,
                    element: <h1>Bill Detail By id</h1>,
                  },
                  {
                    path: "edit",
                    element: <h1>This is the bill edit detail by id</h1>,
                  },
                ],
              },
            ],
          },
          // Accounting Vendor section
          {
            path: "vendor",
            children: [
              {
                index: true,
                element: <h1>Vendor table</h1>,
              },
              {
                path: ":vendorId",
                children: [
                  {
                    index: true,
                    element: <h1>List of transaction by vendor id</h1>,
                  },
                  {
                    path: ":transId",
                    children: [
                      {
                        index: true,
                        element: <h1>The transaction detail id</h1>,
                      },
                      {
                        path: "edit",
                        element: <h1>The transaction edit detail by id</h1>,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // Accounting Report Section
          {
            path: "report",
            children: [
              {
                index: true,
                element: <h1>this is to create the accounting reports</h1>,
              },
            ],
          },
          // Accounting Sales Tax Section
          {
            path: "saletax",
            children: [
              {
                index: true,
                element: <h1>This is the sale tax section</h1>,
              },
            ],
          },
          // Accounting file 1099
          {
            path: "file1099",
            element: <h1>1099 filing</h1>,
          },
          // Accounting Payroll
          {
            path: "payroll",
            children: [
              {
                index: true,
                element: <h1>This is main payroll page</h1>,
              },
              // TODO: DETERMINE ROUTES
            ],
          },
          // accounting mileage section
          {
            path: "mileage",
            children: [
              {
                index: true,
                element: <h1>Mileage main section</h1>,
              },
            ],
          },
        ],
      },
      {
        path: "service",
        element: <LayoutServ />,
        children: [
          {
            index: true,
            element: <ServicePage />,
          },
          {
            path: "dash",
            element: <h1>The dashboard section</h1>,
          },
          {
            path: "add",
            element: <ServiceForm/>
          },
          {
            path: ":serviceId",
            children: [
              {
                index: true,
                element: <h1>Service details</h1>
              },
              {
                path: "edit",
                element: <h1>Edit service detail</h1>
              }
            ]
          }
        ],
      },
      {
        path: "inventory",
        element: <LayoutInv />,
        children: [
          {
            index: true,
            element: <h1>Inventory Overview</h1>,
          },
          {
            path: "equipment",
            children: [
              {
                index: true,
                element: <h1>This is the equipment page</h1>,
              },
            ],
          },
          {
            path: "fleet",
            children: [
              { 
                index: true, 
                element: <h1>This is the fleet page</h1> 
              },
            ],
          },
          {
            path: 'supply',
            children: [
              {
                index: true,
                element: <h1>Supplie page</h1>
              }
            ]
          }
        ],
      }
    ],
  },
]);

export default router;
