import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectEmployeeById } from "./employeeSlice";
import { useNavigate, Link, useParams } from "react-router-dom";

import { Form, Col } from "react-bootstrap";
import styled from "styled-components";
import { addNewEmployee } from "./employeeSlice";

import { 
  FormContainer,
  StyledForm,
  RowForm,
  FormTitle,
  FormButton,
  ImagePreview
} from "./EmployeeForm.module";

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employeeId } = useParams();

  console.log('employee id: ' + employeeId);

  const message = useSelector((state) => state.employees.message);
  const userId = useSelector((state) => state.auth.user.userId);
  
  const employee = useSelector((state) =>  selectEmployeeById(state, employeeId) );

  console.log(`employee: ${employee["name"]}`);

  const initialState = {
    name: employee["name"],
    last_name: employee["last_name"],
    cell_number: employee["cell_number"],
    role: employee["role"],
    birth_date: employee["birth_date"],
    email: employee["email"],
    job_title: employee["job_title"],
    department: employee["department"],
    driver_license: employee["driver_license"],
    start_date: employee["start_date"],
    wage_per_hour: employee["wage_per_hour"],
    created_by: employee["created_by"],
    img_url: employee["imageUrl"]
  };

  const [formData, setFormData] = useState(initialState);
  const [file, setFile] = useState();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const [previewUrl, setPreviewUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl("");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const canSave = addRequestStatus === "idle";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataEmployee = new FormData();
    for (const key in formData) {
      formDataEmployee.append(key, formData[key]);
    }
    formDataEmployee.append("image", file);

    // Testing purposes
    // for(var pair of formDataEmployee.entries()){
    //   console.log(pair[0] + ', ' + pair[1]);
    // }

    if (canSave) {
      try {
        setAddRequestStatus("loading");
        await dispatch(addNewEmployee(formDataEmployee)).unwrap();
        setFormData(initialState);
        navigate("/hr/employee");
      } catch (error) {
        alert("Could not save the employee");
        console.log(error);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <Fragment>
      <div className="row">
        <Link to="/hr/employee" className="col-1 text-center">
          <i className="bi bi-backspace" style={{ fontSize: "30px" }}></i>
        </Link>
          <h1 className="col-10 text-left">Employee {employeeId}</h1>
      </div>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <FormTitle>Add New Employee Details</FormTitle>
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
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </RowForm>
          <RowForm>
            <Col>
              <Form.Group controlId="formBirthDate">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                  type="date"
                  name="birth_date"
                  value={formData.birth_date}
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
            <Form.Group controlId="formEndDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
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
              <Form.Group controlId="formImageFile">
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
                    {/* image preview */}
                    {previewUrl && (
                      <ImagePreview src={previewUrl} alt="Employee" />
                    )}
                  </div>
                </div>
              </Form.Group>
            </Col>
          </RowForm>
          <FormButton type="button" onClick={handleSubmit}>
            Submit
          </FormButton>
        </StyledForm>
      </FormContainer>
    </Fragment>
  );
};

export default EmployeeForm;
