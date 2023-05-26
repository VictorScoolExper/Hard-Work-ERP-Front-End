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
    </div>
  );
};

export default VendorForm;
