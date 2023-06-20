import { useState, Fragment } from "react";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";

function ProjectModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      //   centered
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
    >
      <Form>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>New Project</h2>
          <p>Enter new project details</p>
          <Row>
            <Col className="col-8">
              <Form.Group>
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  name="project_name"
                  // value={address.street}
                  // onChange={(e) => handleChange(e)}
                  // required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="mt-3 col-6">
              <Form.Group>
                <Form.Label>Client Name</Form.Label>
                {/* Create a universal component */}
                <Form.Select>
                  <option>Open this select menu</option>
                  <option value="1">John</option>
                  <option value="2">Biggie</option>
                  <option value="3">Pedro</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>Billing Method</Form.Label>
                <Form.Select>
                  <option>Open this select menu</option>
                  <option value="1">Fixed Cost</option>
                  <option value="2">Per Hour Cost</option>
                  <option value="3">Per Service Cost</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="start_date"
                  // value={formData.birth_date}
                  // onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Finish Date</Form.Label>
                <Form.Control
                  type="date"
                  name="finish_date"
                  // value={formData.birth_date}
                  // onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary">Create</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function ProjectForm() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Fragment>
      {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Add New Project
      </Button> */}
      <Button
        style={{ display: "flex", justifyContent: "space-between" }}
        variant="link"
        onClick={() => setModalShow(true)}
      >
        Add New Project
      </Button>

      <ProjectModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
}

export default ProjectForm;
