import { useState, useEffect } from "react";

import styled from "styled-components";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

const VendorForm = () => {
  const url = window.location.href;
  const searchParams = new URL(url).searchParams;
  const mode = searchParams.get("mode") || "create";

  const [formType, setFormType] = useState(mode);
  const [status, setStatus] = useState("idle");
  const [switchAddress, setSwitchAddress] = useState(false);
  const [vendor, setVendor] = useState({
    name: "",
    last_name: "",
  });

  const handleChange = () => {};

  return (
    <div
      className="container-fluid"
      style={{ overflowY: "scroll", height: "94vh" }}
    >
      <div className="row mt-2">
        <Link to={-1} className="col-1 text-center">
          <i className="bi bi-backspace" style={{ fontSize: "30px" }}></i>
        </Link>

        <h2 className="col-10 text-left">
          {formType === "create" && <FormTitle>New Vendor</FormTitle>}
          {formType === "view" && <FormTitle>View Vendor</FormTitle>}
          {formType === "edit" && <FormTitle>Edit Vendor</FormTitle>}
        </h2>
      </div>
      <FormContainer onSubmit={() => {}}>
        {formType === "create" && <FormTitle>Create New Vendor</FormTitle>}
        {formType === "view" && <FormTitle>View Vendor</FormTitle>}
        {formType === "edit" && <FormTitle>Edit Vendor</FormTitle>}
        <RowForm>
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={vendor.name}
                onChange={handleChange}
                required
                disabled={formType === "view"}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={vendor.last_name}
                onChange={handleChange}
                required
                disabled={formType === "view"}
              />
            </Form.Group>
          </Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Group controlId="formCompany">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={vendor.company}
                onChange={handleChange}
                required
                disabled={formType === "view"}
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
                value={vendor.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCellNumber">
              <Form.Label>Cell Number</Form.Label>
              <Form.Control
                type="text"
                name="cell_number"
                value={vendor.cell_number}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Check
              type="switch"
              id="address-switch"
              label="Add Address"
              checked={switchAddress}
              onChange={() => {
                setSwitchAddress(!switchAddress);
              }}
            />
          </Col>
        </RowForm>
        {/* Address section */}
        {switchAddress && (
          <>
            <RowForm>
              <h4>Address</h4>
            </RowForm>
            <RowForm>
              <Col>
                <Form.Group controlId={`formStreet`}>
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    name="street"
                    value={vendor.street}
                    onChange={handleChange}
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
                    value={vendor.city}
                    onChange={handleChange}
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
                    value={vendor.state}
                    onChange={handleChange}
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
                    value={vendor.zip_code || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </RowForm>
          </>
        )}
        <RowForm>
        <Col>
          <FormButton type="submit">Submit Vendor</FormButton>
        </Col>
      </RowForm>
      </FormContainer>
    </div>
  );
};

export default VendorForm;
