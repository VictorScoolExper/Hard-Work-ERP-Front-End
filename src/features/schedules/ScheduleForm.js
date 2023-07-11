import { useEffect, useState } from "react";
import { getClientAddresses } from "../../util/api/clientAPI";
import { Button, Form, Row, Col, Container } from "react-bootstrap";

import MaterialListForm from "./MaterialListForm";
import Autocomplete from "../../components/Autocomplete";
import SearchModal from "../../components/SearchModal";
import ProjectWidget from "./ProjectWidget";
import DateWidget from "../../components/DateWidget";
import ServiceListForm from "./ServiceListForm";
import { useSelector } from "react-redux";
import { selectSortedClients } from "../clients/clientSlice";
import { selectorSortedServices } from "../services/serviceSlice";

const ScheduleForm = ({ selectedDate, addTask }) => {
  const [scheduledServices, setScheduledServices] = useState({
    client_id: "",
    address_id: "",
    date_scheduled: "",
    scheduled_time: "",
    schedule_type: "",
  });

  // TODO: delte task state
  const [task, setTask] = useState({ title: "", description: "" });
  // These are the address associated with the client
  const [addressOptions, setAddressOptions] = useState([]);
  const [services, setServices] = useState([{ service_id: "", quantity: "" }]);
  const [materials, setMaterials] = useState([
    { materialId: "", quantity: "", subtotal: 0 },
  ]);
  const [loading, setLoading] = useState(false);
  // modal states
  const [clientModal, setClientModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);

  // TODO: investigate if it would be better to have it saved in state
  //  and to get those new update on useEffect
  const clientList = useSelector(selectSortedClients);
  const serviceList = useSelector(selectorSortedServices);

  useEffect(() => {
    (async () => {
      if (scheduledServices.client_id) {
        try {
          setLoading(true);
          const clientAddress = await getClientAddresses(
            scheduledServices.client_id
          );
          setAddressOptions(clientAddress.listAddress);
          console.log(clientAddress.listAddress);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [scheduledServices.client_id]);

  const [projectFormStatus, setProjectFormStatus] = useState(false);
  const [materialFormStatus, setMaterialFormStatus] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

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

  const handleChange = (name, value) => {
    setScheduledServices({ ...scheduledServices, [name]: value });
    // console.log(value);
  };

  const handleSelect = (event) => {
    const { name, value } = event.target;
    // update value of form.control
    setScheduledServices({ ...scheduledServices, [name]: value });
    // console.log(`${name} ${value}`);
  };

  // TODO: Unneeded code
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setTask({ ...task, [name]: value });
  // };

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
          {!loading ? (
            <Form onSubmit={handleSubmit}>
              <Row style={{ marginTop: "10px" }}>
              <Button onClick={() => {
                console.log(scheduledServices);
                console.log(services);  
              }}>
                      Click to see state
                    </Button>
                <Col>
                  <Form.Group>
                    <Form.Label>Client</Form.Label>
                    <Autocomplete
                      type={"Client"}
                      nameInput={"client_id"}
                      propValue={scheduledServices.client_id}
                      handleSelect={handleSelect}
                      incomingLists={clientList}
                      setModalShow={setClientModal}
                    />
                    <SearchModal
                      show={clientModal}
                      onHide={() => setClientModal(false)}
                      type={"Clients"}
                      placeholder={"Enter the clients name"}
                      datalist={clientList}
                      propertynames={["name", "last_name"]}
                      propreturn={"client_id"}
                      handleState={handleChange}
                    />
                    
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
                    {addressOptions.length < 1 ? (
                      <div>
                        <h5>
                          Please select a client to view addresses associated
                        </h5>
                      </div>
                    ) : (
                      <>
                        <Autocomplete
                          type={"Client Address"}
                          nameInput={"address_id"}
                          propValue={scheduledServices.address_id}
                          handleSelect={handleSelect}
                          incomingLists={addressOptions}
                          setModalShow={setAddressModal}
                        />
                        {/* addressModal  */}
                        <SearchModal
                          show={addressModal}
                          onHide={() => setAddressModal(false)}
                          type={"Addresses"}
                          placeholder={"enter the street name"}
                          datalist={addressOptions}
                          propertynames={["street", "city"]}
                          propreturn={"address_id"}
                          handleState={handleChange}
                        />
                      </>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              {/* TODOL create a dynamic list of services */}
              <Row className="border rounded mt-3 mb-3">
                <ServiceListForm
                  services={services}
                  setServices = {setServices}
                  serviceList = {serviceList}
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
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    checked={projectFormStatus}
                    onChange={() => handleSwitchForm("projectForm")}
                  />
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
          ) : (
            <div>
              <h1>Loading Client Address!!</h1>
            </div>
          )}
        </Container>
      )}
      <Button onClick={() => handleSwitchForm("showFormStatus")}>
        {showStatus ? "Close Section" : "Schedule Service"}
      </Button>
    </div>
  );
};

export default ScheduleForm;
