import { Link, useParams } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { selectClientById } from "./clientSlice";

const ClientCard = styled(Card)`
  width: 90%;
  margin: 20px auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const ButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ClientDetailPage = () => {
  const { clientId } = useParams();

  const client = useSelector((state) => 
  selectClientById(state, clientId));

  return (
    <div className="container">
      <div className="row">
        <Link to="/crm/client" className="col-1 text-center">
          <i className="bi bi-backspace" style={{ fontSize: "30px" }}></i>
        </Link>

        <h1 className="col-10 text-left">
          Client {client.name} {client.last_name}
        </h1>
      </div>
      <ClientCard>
        <Card.Header>
            <h4>Details of Client</h4>
        </Card.Header>
        <ListGroup variant="flush">
            <ListGroup.Item>Client ID: {client.client_id}</ListGroup.Item>
            <ListGroup.Item>Name: {client.name}</ListGroup.Item>
            <ListGroup.Item>Email: {client.email}</ListGroup.Item>
            <ListGroup.Item>Mobile Number: {client.cell_number}</ListGroup.Item>
            <ListGroup.Item>Life Stage: {client.life_stage}</ListGroup.Item>
        </ListGroup>
      </ClientCard>
      <ButtonDiv>
        <button type="button" class="btn btn-secondary" style={{width: '80%'}}>View Address</button>
      </ButtonDiv>
    </div>
  );
};

export default ClientDetailPage;
