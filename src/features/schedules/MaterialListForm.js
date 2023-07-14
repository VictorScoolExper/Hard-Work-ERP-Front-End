import { Fragment, useState } from "react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import SearchModal from "../../components/SearchModal";

const MaterialListForm = ({ materials, setMaterials, materialList }) => {
  const [materialModal, setMaterialModal] = useState(false);
  
  // TODO: Turn into a react custom hook
  const handleChange = (type, value, index) => {
    let copiedMaterials = [...materials];
    switch (type) {
      case "material_id":
        copiedMaterials[index].material_id = value;
        break;
      case "quantity":
        copiedMaterials[index].quantity = value;
        break;
      case "subtotal":
        copiedMaterials[index].subtotal = value;
        break;
      case "add":
        const newMaterial = { material_id: "", quantity: "", subtotal: 0 };
        copiedMaterials = [...materials, newMaterial];
        break;
      case "remove":
        copiedMaterials.splice(index, 1);
        break;
    }

    setMaterials(copiedMaterials);
    // console.log(copiedMaterials);
  };

  return (
    <Fragment>
      <Row className="border rounded mt-3 mb-3">
        <h4 className="mt-2">Material Form</h4>
        {materials.map((material, index) => (
          <Row key={index} style={{ marginTop: "10px" }}>
            <Col>
              <Form.Group>
                <Form.Label>Material {index + 1}</Form.Label>
                <InputGroup>
                  <Form.Select
                    onChange={(e) =>
                      handleChange("material_id", e.target.value, index)
                    }
                    value={material.material_id}
                  >
                    <option value={0}>Open to view options</option>
                    {materialList.map((mat, index) => (
                      <option key={index} value={mat.material_id}>
                        {mat.material_name}
                      </option>
                    ))}
                  </Form.Select>
                  <Button
                    variant="primary"
                    onClick={() => setMaterialModal(true)}
                  >
                    <i className="bi bi-search"></i>
                  </Button>
                </InputGroup>
                <SearchModal
                  show={materialModal}
                  onHide={() => setMaterialModal(false)}
                  type={"Materials"}
                  placeholder={"enter material name"}
                  datalist={materialList}
                  propertynames={["material_name"]}
                  propreturn={"material_id"}
                  handleState={handleChange}
                  index={index}
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
                    handleChange("quantity", e.target.value, index)
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
                      handleChange("subtotal", e.target.value, index)
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

export default MaterialListForm;
