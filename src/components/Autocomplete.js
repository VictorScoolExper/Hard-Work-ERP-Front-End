import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Form } from "react-bootstrap";

const AutocompleteContainer = styled.div`
  position: relative;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  list-style-type: none;
  z-index: 1;
`;

const Option = styled.li`
  padding: 0.25rem 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

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

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter options based on input value
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (value) => {
    setInputValue(value);
    setFilteredOptions([]);
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
    <React.Fragment>
      <AutocompleteContainer>
        <Form.Control
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type to search..."
        />
        {filteredOptions.length > 0 && (
          <Dropdown ref={dropdownRef}>
            {filteredOptions.map((option, index) => (
              <Option
                key={index}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Option>
            ))}
          </Dropdown>
        )}
      </AutocompleteContainer>
    </React.Fragment>
  );
};

export default Autocomplete;
