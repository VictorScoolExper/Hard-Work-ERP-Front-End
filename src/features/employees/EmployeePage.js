import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import EmployeeTable from "./EmployeeTable";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmployees, selectEmployees, deleteEmployeeUser } from "./employeeSlice";

const Employee = () => {
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState("true");

  const employeesList = useSelector(selectEmployees);

  const headers = ["Name", "Last_name", "Role", "Job_Title", "Department"];

  useEffect(() => {
    (async () =>{
      try {
        await dispatch(fetchAllEmployees());
      } catch (error) {
        console.error(error);
      }
    })();    
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
            <EmployeeTable
              header={headers}
              data={employeesList}
              link={`/hr/employee/`}
              onDelete={async (employee_id) => {
                try {
                  await dispatch(deleteEmployeeUser(employee_id));
                  await dispatch(fetchAllEmployees());
                } catch (error) {
                  alert(error);
                  console.log('delete ' + error);
                }
              }}
            />
          </>
        )}
        {!employeesList || employeesList.length === 0 && <h3>No Employees Exist</h3>}
      </div>
    </>
  );
};

export default Employee;
