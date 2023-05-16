import { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {} from "./clientSlice";

const ClientTable = () => {
  const headers = ["Name", "Lastname", "Company", "Cell Number", "email"];

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const clientList = null;

  useEffect(() => {}, []);

  return (
    <div>
      {/* TODO: add a section where we can filter the user */}
      {clientList && (
        <Table striped bordered hover>
          <thread>
            <tr>
              {headers && headers.map((item) => <th key={item}>{item}</th>)}
            </tr>
          </thread>
          <tbody>
            {clientList.map((client)=>(
                <tr key={client.client_id}>
                    {headers && headers.map((item) => (
                        <td key={item}>{client[item.toLowerCase()]}</td>
                    ))}
                </tr>
            ))}
          </tbody>
        </Table>
      )}
      {!clientList  && <h3>No clients exist.</h3>}
    </div>
  );
};

export default ClientTable;
