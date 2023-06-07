import { useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import Autocomplete from "../../components/Autocomplete";

const ScheduleForm = ({ selectedDate, addTask }) => {
  const [task, setTask] = useState({ title: "", description: "" });
  const [showStatus, setShowStatus] = useState(false);

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
    <div>
      <h3>Register new service in schedule</h3>
      {showStatus && (
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="">
                  <Form.Label>someting</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Client</Form.Label>
                  <Autocomplete />
                </Form.Group>
              </Col>
              {/* TODO: get the list of address associated to client */}
              {/* Possible solutions: create redux slice, call from the api, save addresses locally */}
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
