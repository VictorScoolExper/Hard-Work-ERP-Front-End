import React, { useState, useEffect, useRef, Fragment } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import SearchModal from "./SearchModal";

// helper function for handle dropdown menu options
const dropdownOption = (opt, type, propertyValueName, index) => {
  switch (type) {
    case "Client":
      return (
        <option key={index} value={opt[propertyValueName]}>
          {opt.name} {opt.last_name}
        </option>
      );
    default:
      break;
  }
};

const Autocomplete = ({
  type,
  nameInput,
  placeholder,
  incomingLists,
  updateState,
}) => {
  const [modalShow, setModalShow] = useState(false);

  const [selectValue, setSelectValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const dropdownRef = useRef(null);

  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (incomingLists !== undefined) {
      setOptions(incomingLists);
    }
  }, []);

  const handleSelect = (event) => {
    const { name, value } = event.target;
    // update value of form.control
    setSelectValue(value);
    // update the state in the previous prop
    updateState(name, value);
  };

  const externalChange = (value) => {
    setSelectValue(value);
    updateState(nameInput, value);
  };

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
          value={selectValue}
          name={nameInput}
        >
          <option>Open the options</option>
          {options.map((opt, index) => (
            (dropdownOption(opt, type, nameInput, index))
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
        datalist={incomingLists}
        inputobject={{ client_id: null }}
        propertynames={["name", "last_name"]}
        setstate={externalChange}
        propreturn={nameInput}
      />
    </Fragment>
  );
};

export default Autocomplete;
