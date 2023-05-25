import { useState } from "react";

import styled from "styled-components";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createClient } from "./clientSlice";

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

const ClientForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [client, setClient] = useState({
    name: "",
    last_name: "",
    email: "",
    cell_number: "",
    life_stage: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip_code: null,
      country: "usa",
    },
  });
  const [formType, setFormType] = useState("create");
  const [requestStatus, setRequestStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, address: { ...client.address, [name]: value } });
    // console.log("the value is " + name + " " + value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO add the clientSlice Thunk function
    try {
      setRequestStatus("loading");
      await dispatch(createClient(client)).unwrap();
      setRequestStatus("succeeded");
      setClient({
        name: "",
        last_name: "",
        email: "",
        cell_number: "",
        life_stage: "",
        address: {
          street: "", 
          city: "",
          state: "",
          zip_code: "",
          country: "USA",
        },
      });
      navigate("/crm/client");
    } catch (error) {
      alert("error ocurred");
      setRequestStatus("error");
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <div
      className="container-fluid"
      style={{ overflowY: "scroll", height: "94vh" }}
    >
      <div className="row mt-2">
        <Link to="/crm/client" className="col-1 text-center">
          <i className="bi bi-backspace" style={{ fontSize: "30px" }}></i>
        </Link>

        <h2 className="col-10 text-left">
          {formType === "create" ? "Create New Client" : "Edit Client"}
        </h2>
      </div>
      <FormContainer onSubmit={handleSubmit}>
        <FormTitle>Add client details</FormTitle>
        <RowForm>
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={client.name}
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
                value={client.last_name}
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
                value={client.cell_number}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formLifeStage">
              <Form.Label>Life Stage of Client</Form.Label>
              <Form.Control
                as="select"
                name="life_stage"
                value={client.life_stage}
                onChange={handleChange}
                required
              >
                <option value="">Select one... </option>
                <option value="customer">Customer</option>
                <option value="lead">Lead</option>
                <option value="opportunity">Opportunity</option>
              </Form.Control>
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
                value={client.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </RowForm>

        <Col>
          <h3>Address</h3>
        </Col>

        <RowForm>
          <Col>
            <Form.Group controlId={`formStreet`}>
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={client.address.street}
                onChange={(e) => handleAddressChange(e)}
                required
              />
            </Form.Group>
          </Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Group controlId={`formCity`}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={client.address.city}
                onChange={(e) => handleAddressChange(e)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId={`formState`}>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={client.address.state}
                onChange={(e) => handleAddressChange(e)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId={`formZipCode`}>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="number"
                name="zip_code"
                value={client.address.zip_code || ""}
                onChange={(e) => handleAddressChange(e)}
                required
              />
            </Form.Group>
          </Col>
        </RowForm>

        <RowForm>
          <Col>
            <FormButton type="submit">Submit</FormButton>
          </Col>
        </RowForm>
      </FormContainer>
    </div>
  );
};

export default ClientForm;
