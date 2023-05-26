import { useState, useEffect } from "react";

import styled from "styled-components";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {createCompany, editCompany, selectCompanyById} from "./companySlice"

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

const CompanyForm = () => {
  const url = window.location.href;
  const searchParams = new URL(url).searchParams;
  const mode = searchParams.get("mode") || "create";

  const { companyId } = useParams();
  const companyRedux = useSelector((state) => selectCompanyById(state, companyId));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [company, setCompany] = useState({ name: "", service_type: "" });
  const [formType, setFormType] = useState(mode);
  const [status, setStatus] = useState('idle');


  useEffect(() => {
    if(companyId){
      setCompany(companyRedux)
    }
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(status === 'idle'){
      switch(formType){
        case "create":
          try {
            setStatus("loading");
            await dispatch(createCompany(company));
            navigate(-1);
            setStatus("idle");
          } catch (error) {
            alert('Error when saving')
            setStatus("idle");
          }
          break;
        case "edit":
          try {
            setStatus("loading");
            await dispatch(editCompany(company));
            setStatus("idle");
            navigate(-1);
          } catch (error) {
            alert('Error when saving')
            setStatus("idle");
          }
          break;
        default:
            break;
      }
    };
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
        {formType === "create" && <FormTitle>New Company</FormTitle>}
        {formType === "view" && <FormTitle>View Company</FormTitle>}
        {formType === "edit" && <FormTitle>Edit Company</FormTitle>}
        </h2>
      </div>

      <FormContainer onSubmit={handleSubmit}>
        {formType === "create" && <FormTitle>Create New Company</FormTitle>}
        {formType === "view" && <FormTitle>View Company</FormTitle>}
        {formType === "edit" && <FormTitle>Edit Company</FormTitle>}
        <RowForm>
          <Col>
            <Form.Group controlId="formName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={company.name}
                onChange={handleChange}
                required
                disabled={formType === 'view'}
              />
            </Form.Group>
          </Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Group controlId="formServiceType">
              <Form.Label>Service Type</Form.Label>
              <Form.Control
                as="select"
                name="service_type"
                value={company.service_type}
                onChange={handleChange}
                required
                disabled={formType === 'view'}
              >
                <option value="">Select one... </option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="service">Service</option>
              </Form.Control>
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

export default CompanyForm;
