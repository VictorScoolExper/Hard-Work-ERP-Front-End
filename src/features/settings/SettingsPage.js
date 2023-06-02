import { useState, useEffect } from "react";

import styled from "styled-components";
import { InputGroup, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SettingsPage = () => {
  const [editState, setEditState] = useState(false);
  const [saleTax, setSaleTax] = useState({ value: "", type: "" });
  const [markUpPrice, setMarkUpPrice] = useState({ value: "", type: "" });


  const editButton = () => {
    setEditState(!editState);
  }

  const handleEdit = (clickFrom) =>{
    switch(clickFrom){
        case 'mark_up_per_material':
            console.log('hello from mark up percent material')
            break;
        case 'sales_tax':
            console.log('This is from sales tax');
            break;
        default:
            alert('Error ocurred');
            break;
    }
  }

  return (
    <div className="container-fluid">
      <div className="col-12 m-2">
        <h1>Setting</h1>
      </div>

      <div className="row" style={{ marginTop: "60px" }}>
        <h2 className="col-6">Setting configuration</h2>
        <Button className="col-3" onClick={editButton} >Edit Settings</Button>
      </div>

      <div style={{ marginTop: "60px" }} className="col-8">
        <Row className="mb-3">
          <Form.Group>
            <Form.Label>Sales Tax</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                name="sales_tax"
                aria-describedby="basic-addon2"
              />
              {editState && (
                <Button variant="warning" id="button-addon2" >
                  Edit
                </Button>
              )}
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group>
            <Form.Label>Mark up percent on Materials</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                name="material_mark_up"
                aria-describedby="basic-addon2"
              />
              {editState && (
                <Button variant="warning" id="button-addon2">
                  Edit
                </Button>
              )}
            </InputGroup>
          </Form.Group>
        </Row>
      </div>
    </div>
  );
};

export default SettingsPage;
