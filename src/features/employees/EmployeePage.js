import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DynamicTable from "../../components/Table";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { fetchAllEmployees } from "./employee-slice";

const Employee = () => {
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState("true")
  
  const headers = ["Name", "Age", "City"];
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", age: 30, city: "ABC" },
    { id: 2, name: "Jane Smith", age: 25, city: "ABC" },
    { id: 3, name: "Bob Johnson", age: 45, city: "ABC" },
  ]);

  useEffect(() =>{
    // get all active employees
    const response = dispatch(fetchAllEmployees(isActive));
    console.log(response);
  }, [dispatch])

 
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
        <h6>Employee Table</h6>
        <DynamicTable header={headers} data={employees} link={`/hr/employee/`} />
      </div>

     
    </>
  );
};

export default Employee;
