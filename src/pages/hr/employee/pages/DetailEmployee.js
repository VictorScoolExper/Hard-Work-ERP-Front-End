import { useState, useEffect } from "react";
import EmployeeForm from "../components/EmployeeForm";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const DetailEmployee = () => {
  const { id } = useParams();

  return (
    <>
      <div className="row">
        <Link to="/hr/employee" className="col-1 text-center">
          <i class="bi bi-backspace" style={{ fontSize: "30px" }}></i>
        </Link>
        {!id ? (
          <h1 className="col-10 text-left">Detail Employee</h1>
        ) : (
            // id should no be used but rather name
          <h1 className="col-10 text-left">Employee {id}</h1>
        )}
      </div>
      <div>
        <EmployeeForm typeTrans />
      </div>
    </>
  );
};

export default DetailEmployee;
