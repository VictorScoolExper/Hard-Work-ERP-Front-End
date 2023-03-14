import { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const DynamicTable = (props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selected, setSelected] = useState(null);

  // const { headers, data } = props;

  const handleDeleteClick = (id) => {
    setSelected(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    const update = props.onDeleteConfirm(selected);
    props.onDelete && props.onDelete(update);
  };

  return (
    <>
      {props.title && <h2>{props.title}</h2>}
      <Table striped bordered hover>
        <thead>
          <tr>
            {props.header &&
              props.header.map((item) => <th key={item}>{item}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((data) => (
            <tr key={data.id}>
              {props.header &&
                props.header.map((item) => (
                  <td key={item}>{data[item.toLowerCase()]}</td>
                ))}
              <td>
                <Link to={props.link + '/' + data.id}>
                  <Button variant="info">
                    <i className="bi bi-pencil-square"></i>
                  </Button>
                </Link>{" "}
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
          Are you sure you want to delete the employee with ID{" "}
          {selected && selected.id}?
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
