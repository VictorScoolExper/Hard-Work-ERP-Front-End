import React, { useState, useEffect, useRef, Fragment } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";


const Autocomplete = ({onChangeInput, selectedValue}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
  ]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const dropdownRef = useRef(null);

  const handleSelect = (event) =>{
    // Copy the select value
    const inputValue = event.target.value;
    // save it in state
    setInputValue(inputValue);
    // pass it to the parent
    onChangeInput(inputValue);
  }

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
        >
            <option>Open the options</option>
            {options.map((opt, index) => (
              <option
                key={index}
                value={opt}
              >
                {opt}
              </option>
            ))}
         
        </Form.Select>
        <Button variant="primary">
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>
    </Fragment>
  );
};

export default Autocomplete;
