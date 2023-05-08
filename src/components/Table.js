import { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";


const DynamicTable = (props) => {
  const navigate = useNavigate();

  const propLink = props.link;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');

  // const { headers, data } = props;

  const handleDeleteClick = (employee) => {
    setSelected(employee.employee_id);
    setName(employee.name);
    setLastName(employee.last_name);
    console.log('id: ' + selected);
    console.log(`fullname: ${name} ${lastname}`);
    
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    props.onDelete(selected);
    setShowDeleteModal(false);
  };

  const navigateToDetails = (id) =>{
    navigate(propLink + id)
  }

  return (
    <>
      {props.title && <h2>{props.title}</h2>}
      <Table striped bordered hover>
        <thead>
          <tr>
            {props.header &&
              props.header.map((item) => <th key={item}>{item}</th>)}
            <th className="text-center" scope="col">Details</th>
            <th className="text-center" scope="col">Edit</th>
            <th className="text-center" scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((data) => (
            <tr key={data.employee_id}>
              {props.header &&
                props.header.map((item) => (
                  <td key={item}>{data[item.toLowerCase()]}</td>
                ))}
              <td className="text-center">
                <Link to={props.link + data.employee_id}>
                  <Button variant="success">
                  <i className="bi bi-binoculars"></i>
                  </Button>
                </Link>{" "}
              </td>
              <td className="text-center">
                <Link to={props.link + data.employee_id + '/edit'}>
                  <Button style={{background: "orange", border: "none"}}>
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                </Link>{" "}
              </td>
              <td className="text-center">
                <Button
                  variant="danger"
                  onClick={() => handleDeleteClick(data)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the employee {" "}
          {name} {" "} {lastname}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant finish="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DynamicTable;
