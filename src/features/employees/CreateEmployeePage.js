import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const FormContainer = styled(Container)`
  margin-top: 50px;
`;

const StyledForm = styled(Form)`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const RowForm = styled(Row)`
  margin: 10px;
`;

const FormTitle = styled.h1`
  margin-bottom: 30px;
`;

const FormButton = styled(Button)`
  width: 100%;
  margin-top: 2rem;
`;

const NewEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    cell_number: '',
    role: '',
    age: '',
    image: null,
    job_title: '',
    department: '',
    driver_license: '',
    start_date: '',
    wage_per_hour: '',
    created_by_user: '',
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <FormTitle>Create New Employee</FormTitle>
        <RowForm>
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Group controlId="formCellNumber">
              <Form.Label>Cell Number</Form.Label>
              <Form.Control
                type="text"
                name="cell_number"
                value={formData.cell_number}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formActive">
              <Form.Label>Active</Form.Label>
              <Form.Control
                as="select"
                name="active"
                value={formData.active}
                onChange={handleChange}
                required
              >
                <option value="">Choose...</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Group controlId="formEmployeeId">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formUserId">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                type="text"
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Group controlId="formJobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="job_title"
                value={formData.job_title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Group controlId="formDriverLicense">
              <Form.Label>Driver License</Form.Label>
              <Form.Control
                type="text"
                name="driver_license"
                value={formData.driver_license}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formEndDate">
              {/* <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
              /> */}
            </Form.Group>
          </Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Group controlId="formWagePerHour">
              <Form.Label>Wage per Hour</Form.Label>
              <Form.Control
                type="text"
                name="wage_per_hour"
                value={formData.wage_per_hour}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col></Col>
          <Col></Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Group controlId="imageFile">
              <Form.Label>Choose employee image</Form.Label>
              <div className="col-sm-10">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                    required
                  />
                  <label className="custom-file-label" htmlFor="image">
                    Choose an image
                  </label>
                </div>
              </div>
            </Form.Group>
          </Col>
        </RowForm>
        <FormButton variant="primary" type="submit">
          Submit
        </FormButton>
      </StyledForm>
    </FormContainer>
  );
};

export default NewEmployeeForm;
