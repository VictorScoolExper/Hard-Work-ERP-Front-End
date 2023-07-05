import { useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";

import MaterialListForm from "./MaterialListForm";
import Autocomplete from "../../components/Autocomplete";
import ProjectForm from "./ProjectForm";
import ProjectWidget from "./ProjectWidget";
import DateWidget from "../../components/DateWidget";
import ServiceListForm from "./ServiceListForm";

const ScheduleForm = ({ selectedDate, addTask }) => {
  const [scheduledServices, setScheduledServices] = useState({
    client: "",
    address: "",
    date_scheduled: "",
    scheduled_time: "",
    schedule_type: "",
  });
  // TODO: delte task state
  const [task, setTask] = useState({ title: "", description: "" });
  const [services, setServices] = useState([{ service: "", quantity: "" }]);
  const [materials, setMaterials] = useState([
    { materialId: "", quantity: "", subtotal: 0 },
  ]);
  const [projectFormStatus, setProjectFormStatus] = useState(false);
  const [materialFormStatus, setMaterialFormStatus] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const handleServiceChange = (index, value, type) => {
    // Copy service list
    let copiedServices = [...services];

    if (type === "quantity") {
      // Change value
      copiedServices[index].quantity = value;
    }

    if (type === "service") {
      // we change the value
      copiedServices[index].service = value;
    }

    if (type === "remove") {
      copiedServices.splice(index, 1);
    }

    if (type === "new") {
      // new service object
      const newService = { service: "", quantity: "" };
      // add to copied services
      copiedServices = [...services, newService];
    }

    // we then overwrite the services
    setServices(copiedServices);
  };

  const handleMaterialChange = (index, value, type) => {
    let copiedMaterials = [...materials];
    switch (type) {
      case "material":
        copiedMaterials[index].materialId = value;
        break;
      case "quantity":
        copiedMaterials[index].quantity = value;
        break;
      case "subtotal":
        copiedMaterials[index].subtotal = value;
        break;
      case "add":
        const newMaterial = { materialId: "", quantity: "", subtotal: 0 };
        copiedMaterials = [...materials, newMaterial];
        break;
      case "remove":
        copiedMaterials.splice(index, 1);
        break;
    }

    setMaterials(copiedMaterials);
    console.log(copiedMaterials);
  };

  const handleSwitchForm = (type) => {
    switch (type) {
      case "materialForm":
        setMaterialFormStatus((materialFormStatus) => !materialFormStatus);
        break;
      case "projectForm":
        setProjectFormStatus((projectFormStatus) => !projectFormStatus);
        break;
      // TODO: delete case or optimize
      case "showFormStatus":
        setShowStatus((showStatus) => !showStatus);
        break;
      default:
        break;
    }
  };

  // TODO: Unneeded code
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
  // End of uneeded code

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
              <ServiceListForm
                handleServiceChange={handleServiceChange}
                services={services}
              />
            </Row>
            {/* End of add services list */}
            <Row className="justify-content-center mt-3">
              <Col xs="auto">
                <Form.Label>Do you want to add materials?</Form.Label>
              </Col>
              <Col>
                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  // label="Check this switch"
                  checked={materialFormStatus}
                  onChange={() => handleSwitchForm("materialForm")}
                />
              </Col>
            </Row>
            {materialFormStatus && (
              <MaterialListForm
                materials={materials}
                handleMaterialChange={handleMaterialChange}
              />
            )}
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <DateWidget />
              </Col>
              <Col className="col-4">
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Starting Hour</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        max="23"
                        // value={hours}
                        // onChange={handleHourChange}
                        placeholder="Hour"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="d-flex align-items-center col-1">
                    {/* <Form.Group> */}
                    <span style={{ marginTop: "20px" }}>:</span>
                    {/* </Form.Group> */}
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>and Minute</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        max="59"
                        // value={minutes}
                        // onChange={handleMinuteChange}
                        placeholder="Minute"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className="align-items-center mt-3">
              <Col xs="auto">
                <Form.Label>Is it a Project?</Form.Label>
              </Col>
              <Col>
                {/* <Form.Check 
                  type="switch"
                  id="custom-switch"
                  checked={projectFormStatus}
                  onChange={()=>handleSwitchForm('projectForm')}
                /> */}
              </Col>
            </Row>
            {projectFormStatus && <ProjectWidget />}
            {/* TODO: Delete */}
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
            {/* End Delte Section */}
          </Form>
        </Container>
      )}
      <Button onClick={() => handleSwitchForm("showFormStatus")}>
        {showStatus ? "Close Section" : "Schedule Service"}
      </Button>
    </div>
  );
};

export default ScheduleForm;
