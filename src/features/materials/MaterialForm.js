import { useState, useEffect } from "react";

import styled from "styled-components";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createMaterial,
  editMaterial,
  selectMaterialById,
} from "./materialSlice";

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

const MaterialForm = () => {
  const url = window.location.href;
  const searchParams = new URL(url).searchParams;
  const mode = searchParams.get("mode") || "create";

  const { materialId } = useParams();
  const materialRedux = useSelector((state) =>
    selectMaterialById(state, materialId)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const materialIniState = {
    service_name: "",
    description: "",
    unit: ""
  };
  const [material, setMaterial] = useState(materialIniState);
  const [formType, setFormType] = useState(mode);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (materialId) {
      setMaterial(materialRedux);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial({ ...material, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "idle") {
      switch (formType) {
        case "create":
          try {
            setStatus("loading");
            await dispatch(createMaterial(material));
            navigate(-1);
            setStatus("idle");
          } catch (error) {
            alert("Error when saving");
            setStatus("idle");
          }
          break;
        case "edit":
          try {
            setStatus("loading");
            await dispatch(editMaterial(material));
            setStatus("idle");
            navigate(-1);
          } catch (error) {
            alert("Error when editing");
            setStatus("idle");
          }
          break;
        default:
          break;
      }
    }
  };

  const formTitles = {
    create: "New Material",
    view: "View Material",
    edit: "Edit Material"
  };
  
  const formTitle = formTitles[formType];

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
            {formTitle}
        </h2>
      </div>

      <FormContainer onSubmit={handleSubmit}>
        <FormTitle>{formTitle}</FormTitle>
        <RowForm>
        <Col>
            <Form.Group controlId="formMaterialName">
              <Form.Label>Material Name</Form.Label>
              <Form.Control
                type="text"
                name="material_name"
                value={material.material_name}
                onChange={handleChange}
                required
                disabled={formType === 'view'}
              />
            </Form.Group>
          </Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={material.description}
                onChange={handleChange}
                required
                disabled={formType === "view"}
              />
            </Form.Group>
          </Col>
        </RowForm>
        <RowForm>
          <Col>
            <Form.Group controlId="formUnitType">
              <Form.Label>Unit Type</Form.Label>
              <Form.Control
                as="select"
                name="unit"
                value={material.unit}
                onChange={handleChange}
                required
                disabled={formType === 'view'}
              >
                <option value="">Select one... </option>
                <option value="piece">Piece/s</option>
                <option value="ton">Ton/s</option>
                <option value="yard">Yard/s</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </RowForm>
        <RowForm>
          <Col>
            {formType === "create" || formType === "edit" ? (
              <FormButton type="submit">Submit</FormButton>
            ) : (
              <></>
            )}
          </Col>
        </RowForm>
      </FormContainer>
    </div>
  );
};

export default MaterialForm;
