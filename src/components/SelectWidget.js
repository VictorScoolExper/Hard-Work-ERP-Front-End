import React, { useState, useEffect, useRef, Fragment } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";


// helper function for handle dropdown menu options
const dropdownOption = (opt, type, propertyValueName, index) => {
  switch (type) {
    case "Client":
      return (
        <option key={index} value={opt[propertyValueName]}>
          {opt.name} {opt.last_name}
        </option>
      );
    case "Client Address":
      return (
        <option key={index} value={opt[propertyValueName]}>
          {opt.street}, {opt.city}
        </option>
      );
    default:
      break;
  }
};

const SelectWidget = ({
  type,
  nameInput,
  incomingLists,
  handleSelect,
  propValue,
  setModalShow
}) => {

  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (incomingLists !== undefined) {
      setOptions(incomingLists);
    }
  }, [incomingLists]);

  return (
    <Fragment>
      <InputGroup>
        <Form.Select
          onChange={handleSelect}
          value={propValue}
          name={nameInput}
        >
          <option value={0} >Open the options</option>
          {options.map((opt, index) => (
            (dropdownOption(opt, type, nameInput, index))
          ))}
        </Form.Select>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>
      
    </Fragment>
  );
};

export default SelectWidget;
