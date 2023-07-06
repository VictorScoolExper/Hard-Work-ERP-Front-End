import React, { useState, useEffect, useRef, Fragment } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import SearchModal from "./SearchModal";

const Autocomplete = ({ onChangeInput, selectedValue }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const [options, setOptions] = useState([
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
  ]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const dropdownRef = useRef(null);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelect = (event) => {
    // Copy the select value
    const inputValue = event.target.value;
    // save it in state
    setInputValue(inputValue);
    // pass it to the parent
    onChangeInput(inputValue);
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
        <Form.Control
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search"
        />
        <Form.Select onChange={handleSelect} value={selectedValue}>
          <option>Open the options</option>
          {options.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </Form.Select>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>
      <SearchModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

export default Autocomplete;
