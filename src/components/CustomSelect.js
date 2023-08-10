import { Form } from "react-bootstrap";

const CustomSelect = ({ label, options, value, onChange}) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Select
                value={value}
                onChange={onChange}
                aria-label={label}    
            >
                <option>
                    Select frequency of time:
                </option>
                {options.map((option)=>(
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    )
}

export default CustomSelect;