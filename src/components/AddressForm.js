import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { getSingleAddress, updateSingleAddress } from "../util/api/addressAPI";

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

const AddressForm = () => {
  const { addressId } = useParams();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    address_id: null,
    street: "",
    city: "",
    state: "",
    zip_code: null,
    country: "usa",
  });

  useEffect(() => {
    (async () => {
      const response = await getSingleAddress(addressId);
      setAddress(response.address[0]);
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(address);
    try {
      await updateSingleAddress(address);
      navigate(-1);
    } catch (error) {
      alert("An error has ocurred");
    }    
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Col>
        <h3>Address {addressId}</h3>
      </Col>

      <RowForm>
        <Col>
          <Form.Group controlId={`formStreet`}>
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={address.street}
              onChange={(e) => handleChange(e)}
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
              value={address.city}
              onChange={(e) => handleChange(e)}
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
              value={address.state}
              onChange={(e) => handleChange(e)}
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
              value={address.zip_code || ""}
              onChange={(e) => handleChange(e)}
              required
            />
          </Form.Group>
        </Col>
      </RowForm>

      <RowForm>
        <Col>
          <FormButton type="submit">Click to Submit Update</FormButton>
        </Col>
      </RowForm>
    </FormContainer>
  );
};

export default AddressForm;
