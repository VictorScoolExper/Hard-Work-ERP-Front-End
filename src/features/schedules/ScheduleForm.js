import { useEffect, useState } from "react";
import { getClientAddresses } from "../../util/api/clientAPI";
import { useDispatch } from "react-redux";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import MaterialListForm from "./MaterialListForm";
import SelectWidget from "../../components/SelectWidget";
import SearchModal from "../../components/SearchModal";
import DateWidget from "../../components/DateWidget";
import ServiceListForm from "./ServiceListForm";
import { useSelector } from "react-redux";
import { selectSortedClients } from "../clients/clientSlice";
import { selectorSortedServices } from "../services/serviceSlice";
import { selectorSortedMaterials } from "../materials/materialSlice";
import { selectorSortedEmployee } from "../employees/employeeSlice";
import EmployeeListForm from "./EmployeeListForm";
import {createSchedule} from "./scheduleSlice"
import CustomSelect from "../../components/CustomSelect";

const ScheduleForm = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Used for select menu for days til repear
  const daysOptions = [
    { label: "Every week", value: 7 },
    { label: "Every 2 weeks", value: 14 },
    { label: "Every 3 weeks", value: 21 },
    { label: "Every month", value: 31 },
    { label: "Every yearly", value: 365 }
  ];

  // Used for select menu for 
  const monthsOptions = [
    { label: "1 months", value: 1  },
    { label: "2 months", value: 2 },
    { label: "3 months", value: 3  },
    { label: "4 months", value: 4 },
    { label: "5 months", value: 5  },
    { label: "6 months", value: 6 },
    { label: "7 months", value: 7  },
    { label: "8 months", value: 8 },
    { label: "9 months", value: 9  },
    { label: "10 months", value: 10 },
    { label: "11 months", value: 11  },
    { label: "12 months", value: 12 }
  ]

  const [scheduledServices, setScheduledServices] = useState({
    client_id: "",
    address_id: "",
    date_scheduled: "",
    start_time: "",
    end_time: "",
    type,
    days_until_repeat: "",
  });

  // These are the address associated with the client
  const [addressOptions, setAddressOptions] = useState([]);
  const [services, setServices] = useState([{ service_id: "", quantity: "" }]);
  const [materials, setMaterials] = useState([
    { material_id: "", quantity: 0, subtotal: 0 },
  ]);
  const [employees, setEmployees] = useState([{employee_id: 0}]);

  // notifies user when loading
  const [loading, setLoading] = useState(false);

  // modal states
  const [clientModal, setClientModal] = useState(false);
  const [addressModal, setAddressModal] = useState(false);

  // Retrieve redux state need and if not available yet we set a blank array
  const clientList = useSelector(selectSortedClients) || [];
  const serviceList = useSelector(selectorSortedServices) || [];
  const materialList = useSelector(selectorSortedMaterials) || [];
  const employeeList = useSelector(selectorSortedEmployee) || [];

  // Gets addresses associated with client
  useEffect(() => {
    (async () => {
      if (scheduledServices.client_id && scheduledServices.client_id != 0) {
        try {
          setLoading(true);
          const clientAddress = await getClientAddresses(
            scheduledServices.client_id
          );
          setAddressOptions(clientAddress.listAddress);
          setLoading(false);
        } catch (err) {
          // console.log(err);
          alert('Error when loading addresses');
        }
      }
    })();
  }, [scheduledServices.client_id]);

  const [materialForm, setMaterialForm] = useState(false);
  const [employeeForm, setEmployeeForm] = useState(false);

  // TODO: add function that checks that the times entered are in the hours that the company works


  const handleSwitchForm = (type) => {
    switch (type) {
      case "materialForm":
        setMaterialForm((materialForm) => !materialForm);
        break;
      case "employeeForm":
        setEmployeeForm((employeeForm) => !employeeForm);
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
    switch (name) {
      case 'client_id':
        handleChange(name, parseInt(value));
        break;
      case 'address_id':
        handleChange(name, parseInt(value));
        break;
      default:
        handleChange(name, value);
        break
    }
    // handleChange(name, parseInt(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // saved
    let copiedSchedule = { ...scheduledServices, ["services"]: services };
    copiedSchedule = {...copiedSchedule, ["status"]: "pending"};

    if (materialForm) {
      copiedSchedule = { ...copiedSchedule, ["materials"]: materials };
    } else {
      copiedSchedule = { ...copiedSchedule, ["materials"] : null }
    }

    if(employeeForm){
      copiedSchedule = { ...copiedSchedule, ["employees"]: employees };
    } else {
      copiedSchedule = { ...copiedSchedule, ["employees"] : null }
    }

    if(type === 'single'){
      copiedSchedule.days_until_repeat = null;
    }
    
   if(type === 'single'){
      try {
        setLoading(true);
        // unwrap has to be added or else it will not throw an error if it ocurres
        await dispatch(createSchedule(copiedSchedule)).unwrap();
        // navigate(-1);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert("Error when creating schedule");
      }
    } 

    if(type === 'routine'){
      
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
                        index={undefined}
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
                  checked={materialForm}
                  onChange={() => handleSwitchForm("materialForm")}
                />
              </Col>
            </Row>
            {materialForm && (
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
                    <Form.Label>Repeat routine</Form.Label>
                    {/* <Form.Control
                      type="number"
                      name={"days_until_repeat"}
                      value={scheduledServices.days_until_repeat}
                      onChange={handleInput}
                    /> */}
                    <CustomSelect
                      label="Select when to repeat:"
                      options={daysOptions}
                      value={scheduledServices.days_until_repeat}
                      onChange={(event)=>{handleChange('days_until_repeat', parseInt(event.target.value))}}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Repeat For:</Form.Label>
                    <CustomSelect
                      label="Select the end of schedule:"
                      options={monthsOptions}
                      value={scheduledServices.month_amounts_routine}
                      onChange={(event)=>{handleChange('month_amounts_routine', parseInt(event.target.value))}}
                    />
                  </Form.Group>
                </Col>
                <Col></Col>
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
            <Row className="justify-content-center mt-3">
              <Col xs="auto">
                <Form.Label>Do you want to add employees?</Form.Label>
              </Col>
              <Col>
                <Form.Check // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  // label="Check this switch"
                  checked={employeeForm}
                  onChange={() => handleSwitchForm("employeeForm")}
                />
              </Col>
            </Row>
            {employeeForm && (
              <EmployeeListForm
                employees={employees}
                setEmployees={setEmployees}
                employeeList={employeeList}
              />
            )}
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
