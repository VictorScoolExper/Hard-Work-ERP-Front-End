import { Fragment } from 'react';
import {Col, Form} from 'react-bootstrap';

const DateWidget = ({handleChange, dateValue, dateName}) => {
    return(
        <Fragment>
            <Form.Group controlId="formStartDate">
                  <Form.Label>Date Schedule</Form.Label>
                  <Form.Control
                    type="date"
                    name={dateName}
                    value={dateValue}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
        </Fragment>
    )
}

export default DateWidget;