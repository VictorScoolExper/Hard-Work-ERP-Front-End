import { useState } from "react";

import styled from "styled-components";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

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
      zip_code: "",
      country: "",
    },
  });
  const [formType, setFormType] = useState("create");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, address: { ...client.address, [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO add the clientSlice Thunk function
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
        country: "",
      },
    });
  };

  return (
    <div className="container" style={{ overflowY: "scroll", height: "94vh" }}>
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
                name="active"
                value={client.life_stage}
                onChange={handleChange}
                required
              >
                <option value="">Choose...</option>
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
        <RowForm>
          {/* {client.address.map((address, index) => (
            <div key={index}>
              <Form.Row>
                <Form.Group as={Col} controlId={`street-${index}`}>
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={(e) => handleAddressChange(e, index)}
                    required
                  />
                </Form.Group>
              </Form.Row>
            </div>
          ))} */}
        </RowForm>
        <RowForm>
          <Col>
            <FormButton type="submit">
              Submit
            </FormButton>
          </Col>
        </RowForm>
      </FormContainer>
    </div>
  );
};

export default ClientForm;
