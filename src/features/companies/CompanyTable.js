import { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getCompanies, selectorSortedCompanies } from "./companySlice";

const CompanyTable = () => {
  const headers = ["Name", "Service_Type"];

  const dispatch = useDispatch();

  const link = "/crm/company/";
  const companyList = useSelector(selectorSortedCompanies);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getCompanies());
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  return (
    <div>
      {companyList && (
        <Table striped bordered hover>
          <thead>
            <tr>
              {headers && headers.map((item) => <th key={item}>{item}</th>)}
              <th className="text-center" scope="col">
                Details
              </th>
              <th className="text-center" scope="col">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {companyList.map((company) => (
              <tr key={company.company_id}>
                {headers &&
                  headers.map((head) => (
                    <td key={head}>{company[head.toLowerCase()]}</td>
                  ))}
                <td className="text-center">
                  <Link to={link + company.company_id + '?mode=view'}>
                    <Button variant="success">
                      <i className="bi bi-binoculars"></i>
                    </Button>
                  </Link>{" "}
                </td>
                <td className="text-center">
                  <Link to={link + company.company_id + '/edit?mode=edit'}>
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
      {!companyList && <h3>No companies exist.</h3>}
    </div>
  );
};

export default CompanyTable;