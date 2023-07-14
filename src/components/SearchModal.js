import { useState, useRef, useEffect } from "react";
import { Modal, Form, Button, ListGroup } from "react-bootstrap";

const SearchModal = ({
  show,
  onHide,
  type,
  placeholder,
  datalist,
  propertynames,
  propreturn,
  handleState,
  index
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isInputValid, setIsInputValid] = useState(true);
  const dropdownRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate if selected value is valid
    if (isInputValid) {
      // retrieve selected value
      const value = inputValue[propreturn];

      if(index === undefined){
        // send the value to previous prop
        handleState(propreturn, value);
        // close modal
        close();
        console.log(`${propreturn} ${value}`);
      } 
      if(typeof index === 'number'){
        // send value to prop function
        handleState(propreturn, value, index);
        // close modal
        close();
      }
    } else {
      alert("Invalid value, please select a valid value");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = datalist.filter((option) => {
      const propertyNames = propertynames;
      const matchingValues = [];

      for (const propertyName of propertyNames) {
        const propertyValue = option[propertyName];

        if (propertyValue.toLowerCase().includes(value.toLowerCase())) {
          matchingValues.push(propertyValue);
        }
      }

      return matchingValues.length > 0 ? { ...option, matchingValues } : null;
    });
    
    setFilteredOptions(filtered);
    setIsInputValid(true);
  };

  const handleOptionClick = (option) => {
    setInputValue(option);
    setFilteredOptions([]);
    setIsInputValid(true);
  };

  const validateInput = () => {
    const isValid = datalist.some(
      (option) => option[propertynames[0]].toLowerCase() === inputValue.toLowerCase()
    );
    setIsInputValid(isValid);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setFilteredOptions([]);
    }
  };

  const close = () => {
    onHide();
    setInputValue("");
    setIsInputValid(true);
  };

  const formControlValue = () => {
    let returnedValue = "";

    if(typeof inputValue === 'object'){
      for(let i = 0; i < propertynames.length; i++){
        returnedValue += `${inputValue[propertynames[i]]} `
      }
    }

    if (typeof inputValue === "string") {
      returnedValue = inputValue;
    }
   
    return returnedValue;
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={onHide}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Search {type}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>
          Please Enter characters in the input to search for {type}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={formControlValue()}
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
                {option[propertynames[0]]} {option[propertynames[1]]}
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
        <Button variant="primary" onClick={handleSubmit}>
          Select
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SearchModal;
