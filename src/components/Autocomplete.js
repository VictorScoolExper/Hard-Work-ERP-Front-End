import React, { useState, useEffect, useRef, Fragment } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";


const Autocomplete = () => {
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
        <Form.Select>
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
          <i class="bi bi-search"></i>
        </Button>
      </InputGroup>
    </Fragment>
  );
};

export default Autocomplete;
