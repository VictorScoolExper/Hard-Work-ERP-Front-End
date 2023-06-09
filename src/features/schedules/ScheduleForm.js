import { useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";

import MaterialForm from "./MaterialForm";
import Autocomplete from "../../components/Autocomplete";

const ScheduleForm = ({ selectedDate, addTask }) => {
  const [task, setTask] = useState({ title: "", description: "" });
  const [showStatus, setShowStatus] = useState(false);
  const [scheduledServices, setScheduledServices] = useState({
    client: "",
    address: "",
    services: [
      {
        serviceId: "",
        qty: "",
      },
    ],
    date_scheduled: "",
    scheduled_time: "",
    schedule_type: "",
  });

  const [services, setServices] = useState([{ service: "", quantity: "" }]);

  const handleServiceChange = (index, value) => {
    const updatedServices = [...services];
    updatedServices[index].service = value;
    setServices(updatedServices);
  };

  const handleQuantityChange = (index, value) => {
    const updatedServices = [...services];
    updatedServices[index].quantity = value;
    setServices(updatedServices);
  };

  const addService = () => {
    setServices([...services, { service: "", quantity: "" }]);
  };

  const removeService = (index) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    setServices(updatedServices);
    console.log(index);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = { ...task, date: selectedDate };
    addTask(newTask);
    setTask({ title: "", description: "" });
  };

  const handleShowStatus = () => {
    setShowStatus(!showStatus);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Register new service in schedule</h3>
      {showStatus && (
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Form.Group>
                  <Form.Label>Client</Form.Label>
                  <Autocomplete />
                </Form.Group>
              </Col>
              <Col></Col>
              {/* TODO: get the list of address associated to client */}
              {/* Possible solutions: create redux slice, call from the api, save addresses locally */}
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Autocomplete />
                </Form.Group>
              </Col>
            </Row>
            {/* TODOL create a dynamic list of services */}
            <Row className="border rounded mt-3 mb-3">
              <h4 className="mt-2" >Services to be done</h4>
              {services.map((service, index) => (
                <Row key={index} style={{ marginTop: "10px" }}>
                  <Col>
                    <Form.Group>
                      <Form.Label>Service</Form.Label>
                      <Autocomplete
                        value={service.service}
                        onChange={(value) => handleServiceChange(index, value)}
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
                          handleQuantityChange(index, e.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                  {services.length > 1 && index !== 0 ? (
                    <Col className="d-flex justify-content-center col-1">
                      <Button
                        variant="danger"
                        onClick={() => removeService(index)}
                      >
                        Remove
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
                onClick={addService}
              >
                Add Service
              </Button>
            </Row>
              
            </Row>
            {/* End of add services list */}
            <MaterialForm />
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Form.Group controlId="formStartDate">
                  <Form.Label>Date Schedule</Form.Label>
                  <Form.Control
                    type="date"
                    name="date_scheduled"
                    // value={formData.start_date}
                    // onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Hour</Form.Label>

                      <Form.Control
                        type="number"
                        min="0"
                        max="23"
                        // value={hours}
                        // onChange={handleHourChange}
                        placeholder="Hours"
                      />
                    </Form.Group>
                  </Col>
                  {/* <Col>
                    <Form.Group>
                      <span>:</span>
                    </Form.Group>
                  </Col> */}
                  <Col>
                    <Form.Group>
                      <Form.Label>Minute</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        max="59"
                        // value={minutes}
                        // onChange={handleMinuteChange}
                        placeholder="Minutes"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Select aria-label="Select one of the following services">
                    <option>Open this select menu</option>
                    <option value="service">Service</option>
                    <option value="project">Project</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col></Col>
            </Row>

            <label>
              Title:
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
              />
            </label>
            <Button type="submit">Add Task</Button>
          </Form>
        </Container>
      )}
      <Button onClick={handleShowStatus}>
        {showStatus ? "Close Section" : "Schedule Service"}
      </Button>
    </div>
  );
};

export default ScheduleForm;
