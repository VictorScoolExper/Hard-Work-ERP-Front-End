import { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { fetchClients, selectSortedClients } from "./clientSlice";

const ClientTable = () => {
  const headers = ["Name", "Last_Name", "Cell_Number", "Email", "Life_Stage"];

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const link = "/crm/client/";

  const clientList = useSelector(selectSortedClients);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchClients());
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  return (
    <div className="container-fluid">
      {/* TODO: add a section where we can filter the user */}
      {clientList && (
        <Table striped bordered hover>
          <thead>
            <tr>
              {headers && headers.map((item) => <th key={item}>{item}</th>)}
              <th className="text-center" scope="col">
                Details
              </th>
              <th className="text-center" scope="col">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            {clientList.map((client) => (
              <tr key={client.client_id}>
                {headers &&
                  headers.map((head) => (
                    <td key={head}>{client[head.toLowerCase()]}</td>
                  ))}
                <td className="text-center">
                  <Link to={link + client.client_id}>
                    <Button variant="success">
                      <i className="bi bi-binoculars"></i>
                    </Button>
                  </Link>{" "}
                </td>
                <td className="text-center">
                  <Link to={link + client.client_id + '/edit'}>
                    <Button style={{ background: "orange", border: "none" }}>
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </Link>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {!clientList && <h3>No clients exist.</h3>}
    </div>
  );
};

export default ClientTable;
