import { Row, Col, Form } from "react-bootstrap";
import ProjectForm from "./ProjectForm";

const ProjectWidget = ({}) => {
  return (
    <>
      <Row className="mt-2">
        <Col className="col-4">
          <Form.Group>
            <Form.Label>Select the project</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
            <ProjectForm />
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ProjectWidget;
