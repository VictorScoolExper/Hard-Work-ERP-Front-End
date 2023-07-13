import { Fragment, useState } from "react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import SearchModal from "../../components/SearchModal";

const EmployeeListForm = ({ employees, setEmployees, employeeList }) => {
  const [employeeModal, setEmployeeModal] = useState(false);
  // TODO: Turn into a react custom hook
  const handleChange = (type, value, index) => {
    let copiedEmployees = [...employees];

    switch (type) {
      case "employee_id":
        copiedEmployees[index].material_id = value;
        break;
      case "add":
        const newEmployee = { employee_id: "" };
        copiedEmployees = [...employees, newEmployee];
        break;
      case "remove":
        copiedEmployees.splice(index, 1);
        break;
      default:
        break;
    }

    setEmployees(copiedEmployees);
  };

  return (
    <Fragment>
      <Row className="border rounded mt-3 mb-3">
        <h4 className="mt-2">Employee Form</h4>
        {employees.map((employee, index) => (
          <Row key={index} style={{ marginTop: "10px" }}>
            <Col>
              <Form.Group>
                <Form.Label>Employee</Form.Label>
                <InputGroup>
                  <Form.Select
                    onChange={(e) =>
                      handleChange("employee_id", e.target.value, index)
                    }
                    value={employee.employee_id}
                  >
                    <option value={0}>Open to view options</option>
                    {employeeList.map((emp, index) => (
                      <option key={index} value={emp.employee_id}>
                        {emp.name} {emp.last_name}
                      </option>
                    ))}
                  </Form.Select>
                  <Button
                    variant="primary"
                    onClick={() => setEmployeeModal(true)}
                  >
                    <i className="bi bi-search"></i>
                  </Button>
                </InputGroup>
                <SearchModal
                  show={employeeModal}
                  onHide={() => setEmployeeModal(false)}
                  type={"Employee"}
                  placeholder={"enter the employee name"}
                  datalist={employeeList}
                  propertynames={["name", "last_name"]}
                  handleState={handleChange}
                  index={index}
                />
              </Form.Group>
            </Col>
            {materials.length > 1 && index !== 0 ? (
              <Col className="d-flex align-items-center col-1">
                <Button
                  variant="danger"
                  style={{ height: "50%", marginTop: "10px" }}
                  onClick={() => handleChange("remove", null, index)}
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
            onClick={() => handleChange("add", null, null)}
          >
            Add Material
          </Button>
        </Row>
      </Row>
    </Fragment>
  );
};

export default EmployeeListForm;
