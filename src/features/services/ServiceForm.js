import { useState, useEffect } from "react";

import styled from "styled-components";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectServiceById } from "./serviceSlice";

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

const ServiceForm = () => {
  const url = window.location.href;
  const searchParams = new URL(url).searchParams;
  const mode = searchParams.get("mode") || "create";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { serviceId } = useParams();
  const serviceRedux = useSelector((state) =>
    selectServiceById(state, serviceId)
  );

  const initialServiceState = {
    service_name: "",
    description: "",
    is_per_hour: null,
    price: null,
    duration_minutes: null,
  };

  const [service, setService] = useState(initialServiceState);
  const [formType, setFormType] = useState(mode);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (serviceId) {
      setService(serviceRedux);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "idle") {
      switch (formType) {
        case "create":
          try {
            setStatus("loading");
            // await dispatch(createCompany(company));
            navigate(-1);
            setService(initialServiceState);
            setStatus("idle");
          } catch (error) {
            alert("Error when saving");
            setStatus("idle");
          }
          break;
        case "edit":
          try {
            setStatus("loading");
            // await dispatch(editCompany(company));
            setStatus("idle");
            navigate(-1);
          } catch (error) {
            alert("Error when saving");
            setStatus("idle");
          }
          break;
        default:
          break;
      }
    }
  };

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
          {formType === "create" && <FormTitle>New Service</FormTitle>}
          {formType === "view" && <FormTitle>View Service</FormTitle>}
          {formType === "edit" && <FormTitle>Edit Service</FormTitle>}
        </h2>
      </div>

      <FormContainer onSubmit={handleSubmit}>
        {formType === "create" && <FormTitle>Create New Service</FormTitle>}
        {formType === "view" && <FormTitle>View Service</FormTitle>}
        {formType === "edit" && <FormTitle>Edit Service</FormTitle>}
        <RowForm>
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                name="service_name"
                value={service.service_name}
                onChange={handleChange}
                required
                disabled={formType === "view"}
              />
            </Form.Group>
          </Col>
          <Col></Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={service.description}
                onChange={handleChange}
                required
                disabled={formType === "view"}
              />
            </Form.Group>
          </Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Group controlId="formIsPerHour">
              <Form.Label>Is service charged per hour?</Form.Label>
              <Form.Control
                as="select"
                name="is_per_hour"
                value={service.is_per_hour}
                onChange={handleChange}
                required
                disabled={formType === "view"}
              >
                <option value="">Select One...</option>
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formDurationMinutes">
              <Form.Label>Is service charged per hour?</Form.Label>
              <Form.Control
                type="number"
                name="duration_minutes"
                value={service.duration_minutes}
                onChange={handleChange}
                required
                disabled={formType === "view"}
              />
            </Form.Group>
          </Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Group controlId="formPrice">
              <Form.Label>Enter the price per hour or per service</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={service.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col></Col>
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

export default ServiceForm;
