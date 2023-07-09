import React, { useState, useEffect, useRef, Fragment } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import SearchModal from "./SearchModal";

// helper function for handle dropdown menu options
const dropdownOption = (opt, type, index) => {
  switch (type) {
    case "Client":
      return (
        <option key={index} value={opt.client_id}>
          {opt.name} {opt.last_name}
        </option>
      );
    default:
      break;
  }
};

const Autocomplete = ({
  handleSelect,
  selectedValue,
  type,
  nameInput,
  placeholder,
  incomingLists,
}) => {
  const [modalShow, setModalShow] = useState(false);

  const [filteredOptions, setFilteredOptions] = useState([]);
  const dropdownRef = useRef(null);

  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (incomingLists !== undefined) {
      setOptions(incomingLists);
    }
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setFilteredOptions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Fragment>
      <InputGroup>
        <Form.Select
          onChange={handleSelect}
          value={selectedValue}
          name={nameInput}
        >
          <option>Open the options</option>
          {options.map((opt, index) => (
            <option key={index} value={opt.client_id}>
              {opt.name} {opt.last_name}
            </option>
            // (dropdownOption(opt, type, index))
          ))}
        </Form.Select>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>
      <SearchModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        type={type}
        placeholder={placeholder}
        datalist = { incomingLists }
        inputobject = {{'client_id': null}}
        propertynames = {['name', 'last_name']}
        idname = {'client_id'}
      />
    </Fragment>
  );
};

export default Autocomplete;
