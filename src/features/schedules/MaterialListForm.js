import { Fragment, useState } from "react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import Autocomplete from "../../components/Autocomplete";

const MaterialListForm = ({materials, handleMaterialChange}) => {
  
  return (
    <Fragment>
        <Row className="border rounded mt-3 mb-3">
          <h4 className="mt-2">Material Form</h4>
          {materials.map((material, index) => (
            <Row key={index} style={{ marginTop: "10px" }}>
              <Col>
                <Form.Group>
                  <Form.Label>Material</Form.Label>
                  <Autocomplete
                    selectedValue={material.materialId}
                    onChangeInput={(value) => handleMaterialChange(index, value, 'material')}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={material.quantity}
                    onChange={(e) =>
                      handleMaterialChange(index, e.target.value, 'quantity')
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>SubTotal</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control 
                      aria-label="Sub Total on Material" 
                      type="number"
                      value={material.subtotal}
                      onChange={(e) =>
                        handleMaterialChange(index, e.target.value, 'subtotal')
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              {materials.length > 1 && index !== 0 ? (
                <Col className="d-flex align-items-center col-1">
                  <Button
                    variant="danger"
                    style={{ height: "50%", marginTop: "10px" }}
                    onClick={() => handleMaterialChange(index, null, 'remove')}
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
              onClick={()=>handleMaterialChange(null, null, "add")}
            >
              Add Material
            </Button>
          </Row>
        </Row>
    </Fragment>
  );
};

export default MaterialListForm;
