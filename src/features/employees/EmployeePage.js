import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DynamicTable from "../../components/Table";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmployees, selectEmployees } from "./employeeSlice";

const Employee = () => {
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState("true");

  const employeesList = useSelector(selectEmployees);

  const headers = ["Name", "Last_name", "Role", "Job_Title", "Department"];

  useEffect(() => {
    // get all active employees
    const response = dispatch(fetchAllEmployees(isActive));
  }, [dispatch]);

  return (
    <>
      <div className="row d-flex p-2">
        <div className="col-6">
          <h1>Employee</h1>
        </div>
        <div className="col-6 d-flex flex-row">
          <Link to="/hr/employee/add" className="p-0">
            <Button>Add Employee</Button>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        {employeesList && (
          <>
            <h6>Employee Table</h6>
            <DynamicTable
              header={headers}
              data={employeesList}
              link={`/hr/employee/`}
            />
          </>
        )}
        {!employeesList && <h3>No Employees Exist</h3>}
      </div>
    </>
  );
};

export default Employee;
