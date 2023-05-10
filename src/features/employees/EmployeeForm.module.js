import styled from "styled-components";
import { Container, Form, Button, Row } from "react-bootstrap";

export const FormContainer = styled(Container)`
  margin-top: 50px;
`;

export const StyledForm = styled(Form)`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
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