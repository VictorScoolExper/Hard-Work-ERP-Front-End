import { useState, useRef, useEffect } from "react";
import { Modal, Form, Button, ListGroup } from "react-bootstrap";

const SearchModal = (props) => {
  const [options, setOptions] = useState(props.dataList);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isInputValid, setIsInputValid] = useState(true);
  const dropdownRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(isInputValid);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = options.filter((option) =>
      option[props.propertyName].toLowerCase().includes(value.toLowerCase())
    );

    setFilteredOptions(filtered);
    setIsInputValid(true);
    // console.log(inputValue);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setFilteredOptions([]);
    setIsInputValid(true);
  };

  const validateInput = () => {
    const isValid = options.some(
      (option) => option[props.propertyName].toLowerCase() === inputValue.toLowerCase()
    );
    setIsInputValid(isValid);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setFilteredOptions([]);
    }
  };

  const close = () => {
    props.onHide();
    setInputValue("");
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Search {props.type}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>
            Please Enter characters in the input to search for {props.type}
          </Form.Label>
          <Form.Control
            type="text"
            placeholder={props.placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={validateInput}
            isInvalid={!isInputValid}
          />
          {/* Dropdown suggestions */}
          {filteredOptions.length > 0 && (
            <ListGroup ref={dropdownRef}>
              {filteredOptions.map((option, index) => (
                <ListGroup.Item
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  style={{ cursor: "pointer" }}
                >
                  {option.name} {option.last_name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          {/* If input is invalid */}
          {!isInputValid && (
            <Form.Control.Feedback type="invalid">
              Invalid value entered.
            </Form.Control.Feedback>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          <Button variant="primary">Select</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SearchModal;
