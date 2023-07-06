import { Modal, Form, Button } from "react-bootstrap";

const SearchModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
    >
      <Form>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Search {props.type}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h1>Contains search input and suggestions</h1>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary">Select</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SearchModal;
