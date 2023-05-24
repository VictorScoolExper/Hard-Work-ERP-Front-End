import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectEmployeeById } from "./employeeSlice";
import { useNavigate, Link, useParams } from "react-router-dom";

import styled from "styled-components";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

import { editEmployee } from "./employeeSlice";

export const FormContainer = styled(Form)`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
`;

export const RowForm = styled(Row)`
  margin: 10px;
`;

export const FormTitle = styled.h1`
  margin-bottom: 30px;
`;

export const FormButton = styled(Button)`
  width: 100%;
  margin-top: 2rem;
`;

export const ImagePreview = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-left: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employeeId } = useParams();

  const message = useSelector((state) => state.employees.message);
  const userId = useSelector((state) => state.auth.user.userId);

  const employee = useSelector((state) =>
    selectEmployeeById(state, employeeId)
  );

  const initialState = {
    name: employee["name"],
    last_name: employee["last_name"],
    cell_number: employee["cell_number"],
    active: employee["active"],
    role: employee["role"],
    birth_date: formatDate(employee["birth_date"]),
    email: employee["email"],
    job_title: employee["job_title"],
    department: employee["department"],
    driver_license: employee["driver_license"],
    start_date: formatDate(employee["start_date"]),
    wage_per_hour: employee["wage_per_hour"],
    created_by: userId,
    image_name: employee["image_name"],
    img_url: employee["imageUrl"],
  };

  const [formData, setFormData] = useState(initialState);
  const [file, setFile] = useState();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");


  const [previewUrl, setPreviewUrl] = useState("");
  useEffect(() => {
    setPreviewUrl(formData.img_url);
  }, []);


  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

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
    formDataEmployee.append("employeeId", employeeId)
    formDataEmployee.append("image", file);
    // console.log(formDataEmployee.get("employeeId"));
    if (canSave) {
      try {
        setAddRequestStatus("loading");
        await dispatch(editEmployee(formDataEmployee)).unwrap();
        setFormData(initialState);
        navigate("/hr/employee");
      } catch (error) {
        alert("Could not save the employee");
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <Fragment className="container-fluid">
      <div className="row">
        <Link to="/hr/employee" className="col-1 text-center">
          
        </Link>
        <h1 className="col-10 text-left">Employee {formData.name} {formData.last_name}</h1>
      </div>
      <FormContainer onSubmit={handleSubmit}>
          <FormTitle>Edit Employee Details</FormTitle>
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
                    <ImagePreview src={previewUrl} alt="Employee" />
                  </div>
                </div>
              </Form.Group>
            </Col>
          </RowForm>
          <FormButton type="button" onClick={handleSubmit}>
            Submit
          </FormButton>
      </FormContainer>
    </Fragment>
  );
};

export default EmployeeForm;
