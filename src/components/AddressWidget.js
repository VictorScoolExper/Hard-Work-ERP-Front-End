
import { Card, ListGroup } from "react-bootstrap";
import styled from "styled-components";

const AddressCard = styled(Card)`
  width: 90%;
  margin: 20px auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;


const AddressWidget = ({address}) => {

    return(
        <AddressCard>
          <Card.Header>
            Address {address.address_id}
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>Street: {address.street}</ListGroup.Item>
            <ListGroup.Item>City: {address.city}</ListGroup.Item>
            <ListGroup.Item>State: {address.state}</ListGroup.Item>
            <ListGroup.Item>Zip Code: {address.zip_code}</ListGroup.Item>
          </ListGroup>
        </AddressCard>
    );
}

export default AddressWidget;