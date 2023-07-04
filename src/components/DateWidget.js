import { Fragment } from 'react';
import {Col, Form} from 'react-bootstrap';

const DateWidget = () => {
    return(
        <Fragment>
            <Form.Group controlId="formStartDate">
                  <Form.Label>Date Schedule</Form.Label>
                  <Form.Control
                    type="date"
                    name="date_scheduled"
                    // value={formData.start_date}
                    // onChange={handleChange}
                    required
                  />
                </Form.Group>
        </Fragment>
    )
}

export default DateWidget;