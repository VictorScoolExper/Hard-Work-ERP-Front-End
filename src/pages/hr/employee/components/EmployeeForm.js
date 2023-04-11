import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./EmployeeForm.css";

function EmployeeForm(props) {
  const { id } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", { firstName, lastName, email, phone });
    // Here you can add your code to send the form data to a backend API or store it in a database
  };

  return (
    <div className="p-3">
      <Form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <Form.Group controlId="firstName" className="col-6">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="lastName" className="col-6">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </Form.Group>
        </div>
        <div className="col-8 mb-3">
          <Form.Group controlId="email" >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
        </div>
        <div className="col-4 mb-3">
          <Form.Group controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </Form.Group>
        </div>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default EmployeeForm;
