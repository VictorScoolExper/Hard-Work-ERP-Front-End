import { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getVendors, selectSortedVendors } from "./vendorSlice";
import {
  getCompanies,
  selectCompanyById,
  selectorSortedCompanies,
} from "../companies/companySlice";

const VendorTable = () => {
  const headers = [
    { id: "name", title: "Name" },
    { id: "last_name", title: "Last Name" },
    { id: "company_id", title: "Company" },
    { id: "cell_number", title: "Cell Phone" },
    { id: "email", title: "Email" },
  ];

  const dispatch = useDispatch();

  const link = "/crm/vendor/";

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getCompanies());
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getVendors());
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  const vendorList = useSelector(selectSortedVendors);
  const companyList = useSelector(selectorSortedCompanies);

  const getCompanyName = (id) => {
    const company = companyList.find(
      (company) => company.company_id === Number(id)
    );
    // console.log(company);
    return company.name;
  };

  return (
    <div>
      {vendorList && (
        <Table striped bordered hover>
          <thead>
            <tr>
              {headers &&
                headers.map((item) => <th key={item.id}>{item.title}</th>)}
              <th className="text-center" scope="col">
                Details
              </th>
              <th className="text-center" scope="col">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {vendorList.map((vendor) => (
              <tr key={vendor.vendor_id}>
                {headers &&
                  headers.map((head) => (
                    <td key={head.id}>
                      {head.id === "company_id"
                        ? `${getCompanyName(vendor[head.id])}`
                        : vendor[head.id]}
                    </td>
                  ))}
                <td className="text-center">
                  <Link to={link + vendor.vendor_id + "?mode=view"}>
                    <Button variant="success">
                      <i className="bi bi-binoculars"></i>
                    </Button>
                  </Link>{" "}
                </td>
                <td className="text-center">
                  <Link to={link + vendor.vendor_id + "/edit?mode=edit"}>
                    <Button style={{ background: "orange", border: "none" }}>
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </Link>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default VendorTable;
