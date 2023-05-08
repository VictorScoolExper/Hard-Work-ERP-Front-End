import { useState, useEffect, Fragment } from "react";
import EmployeeForm from "./EmployeeForm";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const AddEditEmployee = () => {
  const { employeeId } = useParams();
  console.log('id: ' + employeeId);
  
  return (
    <Fragment>
      <div className="row">
        <Link to="/hr/employee" className="col-1 text-center">
          <i className="bi bi-backspace" style={{ fontSize: "30px" }}></i>
        </Link>

        {!employeeId ? (
          <h1 className="col-10 text-left">Add new Employee</h1>
        ) : (
            // id should no be used but rather name
          <h1 className="col-10 text-left">Employee {employeeId}</h1>
        )}
      </div>
  
      <EmployeeForm />
      
    </Fragment>
  );
};

export default AddEditEmployee;
