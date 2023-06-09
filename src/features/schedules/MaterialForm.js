import {useState} from "react";
import { Row } from "react-bootstrap";

const MaterialForm = () => {
    const [materials, setMaterials] = useState([{ materialId: "", quantity: "", subtotal: 0 }]);

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
    
      const addService = () => {
        setMaterials([...materials, { materialId: "", quantity: "", subtotal: 0 }]);
      };
    
      const removeService = (index) => {
        const updatedMaterials = [...materials];
        updatedMaterials.splice(index, 1);
        setMaterials(updatedMaterials);
        console.log(index);
      };
    

  return (
    <Row className="border rounded mt-3 mb-3">
      <h4 className="mt-2">Material Form</h4>
        { materials.map((material, index) => (
            <Row key={index} style={{marginTop: "10px"}}>
                <h1>Hello</h1>
            </Row>
        ))}
    </Row>
  );
};

export default MaterialForm;
