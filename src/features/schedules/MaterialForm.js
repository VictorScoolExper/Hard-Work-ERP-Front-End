import { useState } from "react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import Autocomplete from "../../components/Autocomplete";

const MaterialForm = () => {
  const [materials, setMaterials] = useState([
    { materialId: "", quantity: "", subtotal: 0 },
  ]);

  const handleMaterialChange = (index, value) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index].materialId = value;
    setMaterials(updatedMaterials);
  };

  const handleQuantityChange = (index, value) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index].quantity = value;
    setMaterials(updatedMaterials);
  };

  const addMaterial = () => {
    setMaterials([...materials, { materialId: "", quantity: "", subtotal: 0 }]);
  };

  const removeMaterial = (index) => {
    const updatedMaterials = [...materials];
    updatedMaterials.splice(index, 1);
    setMaterials(updatedMaterials);
    console.log(index);
  };

  return (
    <Form>
      <Row className="border rounded mt-3 mb-3">
        <h4 className="mt-2">Material Form</h4>
        {materials.map((material, index) => (
          <Row key={index} style={{ marginTop: "10px" }}>
            <Col>
              <Form.Group>
                <Form.Label>Material</Form.Label>
                <Autocomplete
                  value={materials.materialId}
                  onChange={(value) => handleMaterialChange(index, value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={materials.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>SubTotal</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control aria-label="Sub Total on Material" />
                </InputGroup>
              </Form.Group>
            </Col>
            {materials.length > 1 && index !== 0 ? (
              <Col className="d-flex align-items-center col-1">
                <Button
                  variant="danger"
                  style={{ height: "50%", marginTop: "10px" }}
                  onClick={() => removeMaterial(index)}
                >
                  Remove
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
            onClick={addMaterial}
          >
            Add Material
          </Button>
        </Row>
      </Row>
    </Form>
  );
};

export default MaterialForm;
