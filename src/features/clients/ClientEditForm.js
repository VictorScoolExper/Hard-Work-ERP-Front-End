import { useEffect } from "react";

import { Container, Form, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectClientById } from "./clientSlice";
import { useState } from "react";
import { getClientAddresses } from "../../util/api/clientAPI";
import AddressWidget from "../../components/AddressWidget";

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

const ClientEditForm = () => {
  const { clientId } = useParams();

  const reduxClient = useSelector((state) => selectClientById(state, clientId));
  const [client, setClient] = useState(reduxClient);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    (async () => {
      const clientAddress = await getClientAddresses(clientId);
      setAddresses(clientAddress.listAddress);
    })();
  }, []);

  const handleChange = () => {};

  return (
    <div className="container-fluid">
      <div className="row">
        <Link to="/crm/client" className="col-1 text-center">
          <i className="bi bi-backspace" style={{ fontSize: "30px" }}></i>
        </Link>
        <h1 className="col-10 text-left">
          Client {client.name} {client.last_name}
        </h1>
      </div>
      {/* form inputs */}
      <FormContainer>
        <FormTitle>Edit Client Details Below</FormTitle>
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
        {addresses.length > 0 &&
          addresses.map((address) => (
            <>
              <AddressWidget
                className="col"
                key={address.address_id}
                address={address}
              />
              <div class="d-flex justify-content-center">
                <Link to={`/crm/client/${clientId}/edit/address/${address.address_id}`} >
                  <Button style={{ width: "100%" }} type="button">
                    Edit address {address.address_id} with street{" "}
                    {address.street} in {address.city}
                  </Button>
                </Link>
              </div>
            </>
          ))}
      </FormContainer>
    </div>
  );
};

export default ClientEditForm;
