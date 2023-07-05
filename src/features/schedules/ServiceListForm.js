import { Fragment, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import Autocomplete from "../../components/Autocomplete";

const ServiceListForm = ({ services, handleServiceChange }) => {
  
  return (
    <Fragment>
      <h4 className="mt-2">Services to be done</h4>
      {services.map((service, index) => (
        <Row key={index} style={{ marginTop: "10px" }}>
          <Col>
            <Form.Group>
              <Form.Label>Service</Form.Label>
              <Autocomplete
                // TODO: change service.service to service.serviceId 
                selectedValue={service.service}
                onChangeInput={(value) => {
                  handleServiceChange(index, value, "service");
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Quantity/Amount Hours</Form.Label>
              <Form.Control
                type="number"
                value={service.quantity}
                onChange={(e) =>
                  handleServiceChange(index, e.target.value, "quantity")
                }
              />
            </Form.Group>
          </Col>
          {services.length > 1 && index !== 0 ? (
            <Col className="d-flex align-items-center col-1">
              <Button
                variant="danger"
                style={{ marginTop: "30px" }}
                onClick={() => {
                  handleServiceChange(index, null, "remove");
                }}
              >
                <i className="bi bi-trash"></i>
              </Button>
            </Col>
          ) : (
            <></>
          )}
        </Row>
      ))}
      <Row className="d-flex justify-content-center mb-3">
        <Button
          className="col-8"
          style={{ marginTop: "10px" }}
          variant="primary"
          onClick={() => handleServiceChange(null, null, "new")}
        >
          Add Task
        </Button>
      </Row>
    </Fragment>
  );
};

export default ServiceListForm;
