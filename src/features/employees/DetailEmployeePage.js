import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import styled from "styled-components";
import WageCard from "./WageCard";
import { useSelector } from "react-redux";
import { selectEmployeeById } from "./employeeSlice";

const EmployeeCard = styled(Card)`
  width: 90%;
  margin: 20px auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const CircularImage = styled(Card.Img)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin: 15px auto;
`;

const EmployeeInfo = () => {
  const { employeeId } = useParams();
  const employee = useSelector((state) =>
    selectEmployeeById(state, employeeId)
  );
  
  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  function calculateAge(dateString) {
    var birthday = new Date(dateString);
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const formattedStartDate = formatDate(employee.start_date);
  const formattedBirthDate = formatDate(employee.birth_date);
  const employeeAge = calculateAge(employee.birth_date);
  

  return (
    <Fragment>
      <div className="row">
        <Link to="/hr/employee" className="col-1 text-center">
          <i className="bi bi-backspace" style={{ fontSize: "30px" }}></i>
        </Link>

        <h1 className="col-10 text-left">
          Detail Employee {employee.name} {employee.last_name}
        </h1>
      </div>
      <div className="row m-5">
        <div className="col-6">
          <CircularImage
            src={
              employee.imageUrl ||
              "https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_1280.png"
            }
            alt="Employee"
          />
        </div>
        <div className="col-6">
          <WageCard wage={employee.wage_per_hour} />
        </div>
      </div>
      <EmployeeCard>
        <Card.Header>
          <h2>
            Details of Employee {employee.name} {employee.last_name}
          </h2>
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>Employee ID: {employee.employee_id}</ListGroup.Item>
          <ListGroup.Item>Email: {employee.email}</ListGroup.Item>
          <ListGroup.Item>Cell Number: {employee.cell_number}</ListGroup.Item>
          <ListGroup.Item>Role: {employee.role}</ListGroup.Item>
          <ListGroup.Item>Age: {employeeAge}</ListGroup.Item>
          <ListGroup.Item>Birth Date: {formattedBirthDate}</ListGroup.Item>
          <ListGroup.Item>Active: {employee.active}</ListGroup.Item>
          {/* <ListGroup.Item>User ID: {employee.user_id}</ListGroup.Item> */}
          <ListGroup.Item>Job Title: {employee.job_title}</ListGroup.Item>
          <ListGroup.Item>Department: {employee.department}</ListGroup.Item>
          <ListGroup.Item>
            Driver License: {employee.driver_license}
          </ListGroup.Item>
          <ListGroup.Item>Start Date: {formattedStartDate}</ListGroup.Item>
          <ListGroup.Item>
            End Date: {employee.end_date || "still active"}
          </ListGroup.Item>
          <ListGroup.Item>
            Wage per Hour: ${employee.wage_per_hour}
          </ListGroup.Item>
        </ListGroup>
      </EmployeeCard>
    </Fragment>
  );
};

export default EmployeeInfo;
