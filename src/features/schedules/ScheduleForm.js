import { useEffect, useState } from "react";
import { getClientAddresses } from "../../util/api/clientAPI";
import { Button, Form, Row, Col, Container } from "react-bootstrap";

import MaterialListForm from "./MaterialListForm";
import SelectWidget from "../../components/SelectWidget";
import SearchModal from "../../components/SearchModal";
import DateWidget from "../../components/DateWidget";
import ServiceListForm from "./ServiceListForm";
import { useSelector } from "react-redux";
import { selectSortedClients } from "../clients/clientSlice";
import { selectorSortedServices } from "../services/serviceSlice";
import { selectorSortedMaterials } from "../materials/materialSlice";

const ScheduleForm = ({ type }) => {
  const [scheduledServices, setScheduledServices] = useState({
    client_id: "",
    address_id: "",
    date_scheduled: "",
    start_time: "",
    end_time: "",
    schedule_type: type,
    days_until_repeat: "",
  });

  // These are the address associated with the client
  const [addressOptions, setAddressOptions] = useState([]);
  const [services, setServices] = useState([{ service_id: "", quantity: "" }]);
  const [materials, setMaterials] = useState([
    { material_id: "", quantity: "", subtotal: 0 },
  ]);

  // notifies user when loading
  const [loading, setLoading] = useState(false);

  // modal states
  const [clientModal, setClientModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);

  // Retrieve redux state need and if not available yet we set a blank array
  const clientList = useSelector(selectSortedClients) || [];
  const serviceList = useSelector(selectorSortedServices) || [];
  const materialList = useSelector(selectorSortedMaterials) || [];

  // Gets addresses associated with client
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

  const [materialFormStatus, setMaterialFormStatus] = useState(false);

  const handleSwitchForm = (type) => {
    switch (type) {
      case "materialForm":
        setMaterialFormStatus((materialFormStatus) => !materialFormStatus);
        break;
      default:
        break;
    }
  };

  const handleChange = (name, value) => {
    setScheduledServices({ ...scheduledServices, [name]: value });
    // console.log(value);
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    // update value of form.control
    handleChange(name, value);
    // console.log(`${name} ${value}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // saved
    setScheduledServices({ ...scheduledServices, ["services"]: services });

    if (materialFormStatus) {
      const copiedSchedules = scheduledServices;
      setScheduledServices({ ...copiedSchedules, ["materials"]: materials });
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Register new {type} in schedule</h3>
      <Container>
        {!loading ? (
          <Form onSubmit={handleSubmit}>
            <Row style={{ marginTop: "10px" }}>
              <Button
                onClick={() => {
                  console.log(scheduledServices);
                  // console.log(services);
                  // console.log(materials);
                }}
              >
                Click to see state
              </Button>
              <Col>
                <Form.Group>
                  <Form.Label>Client</Form.Label>
                  <SelectWidget
                    type={"Client"}
                    nameInput={"client_id"}
                    propValue={scheduledServices.client_id}
                    handleSelect={handleInput}
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
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  {addressOptions.length < 1 ? (
                    <div>
                      <p>Please select a client to view addresses associated</p>
                    </div>
                  ) : (
                    <>
                      <SelectWidget
                        type={"Client Address"}
                        nameInput={"address_id"}
                        propValue={scheduledServices.address_id}
                        handleSelect={handleInput}
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
                setServices={setServices}
                serviceList={serviceList}
              />
            </Row>
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
                setMaterials={setMaterials}
                materialList={materialList}
                // handleMaterialChange={handleMaterialChange}
              />
            )}
            {type === "routine" ? (
              <Row style={{ marginTop: "10px" }}>
                <Col className="col-4">
                  <Form.Group>
                    <Form.Label>Days until repeat routine</Form.Label>
                    <Form.Control
                      type="number"
                      name={"days_until_repeat"}
                      value={scheduledServices.days_until_repeat}
                      onChange={handleInput}
                    />
                  </Form.Group>
                </Col>
              </Row>
            ) : (
              <></>
            )}
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <DateWidget
                  dateName={"date_scheduled"}
                  dateValue={scheduledServices.date_scheduled}
                  handleChange={handleInput}
                />
              </Col>
              <Col className="col-4">
                <Form.Group>
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="start_time"
                    value={scheduledServices.start_time}
                    onChange={handleInput}
                  />
                </Form.Group>
              </Col>
              <Col className="col-4">
                <Form.Group>
                  <Form.Label>Finish Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="end_time"
                    value={scheduledServices.end_time}
                    onChange={handleInput}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row style={{ marginTop: "10px", marginBottom: "50px" }}>
              <Col className="d-flex justify-content-center">
                <Button className="col-6" type="submit">
                  Add To Schedule
                </Button>
              </Col>
            </Row>
          </Form>
        ) : (
          <div>
            <h1>Loading!!</h1>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ScheduleForm;
