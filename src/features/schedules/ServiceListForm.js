import { Fragment, useState } from "react";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import SearchModal from "../../components/SearchModal";

const ServiceListForm = ({ services, setServices, serviceList }) => {
  const [serviceModal, setServiceModal] = useState(false);

  const handleChange = (type, value, index) => {
    // Copy service list
    let copiedServices = [...services];

    if (type === "quantity") {
      // Change value
      copiedServices[index].quantity = parseInt(value);
    }

    if (type === "service_id") {
      // we change the value
      copiedServices[index].service_id = parseInt(value);
    }

    if (type === "remove") {
      copiedServices.splice(index, 1);
    }

    if (type === "new") {
      // new service object
      const newService = { service_id: "", quantity: "" };
      // add to copied services
      copiedServices = [...services, newService];
    }

    // we then overwrite the services
    setServices(copiedServices);
  };


  return (
    <Fragment>
      <h4 className="mt-2">Services to be done</h4>
      {services.map((service, index) => (
        <Row key={index} style={{ marginTop: "10px" }}>
          <Col>
            <Form.Group>
              <Form.Label>Service {index + 1}</Form.Label>
            
              <InputGroup>
                <Form.Select
                  onChange={(e) =>
                    handleChange("service_id", e.target.value, index)
                  }
                  value={service.service_id}
                >
                  <option value={0}>Open to view options</option>
                  {serviceList.map((serv, index) => (
                    <option key={index} value={serv.service_id}>
                      {serv.service_name}
                    </option>
                  ))}
                </Form.Select>
                <Button variant="primary" onClick={() => setServiceModal(true)}>
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
              <SearchModal
                show={serviceModal}
                onHide={() => setServiceModal(false)}
                type={"Services"}
                placeholder={"enter the name of the service"}
                datalist={serviceList}
                propertynames={["service_name"]}
                propreturn={"service_id"}
                handleState={handleChange}
                index={index}
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
                  handleChange("quantity", e.target.value, index)
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
                  handleChange("remove", null, index);
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
          onClick={() => handleChange("new", null, null)}
        >
          Add Service
        </Button>
      </Row>
    </Fragment>
  );
};

export default ServiceListForm;
