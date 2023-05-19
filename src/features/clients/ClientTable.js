import { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { fetchClients, selectSortedEmployee } from "./clientSlice";

const ClientTable = () => {
  const headers = ["Name", "Last_Name", "Cell_Number", "Email", "Life_Stage"];

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const clientList = useSelector(selectSortedEmployee)

  useEffect(() => {
    (async () =>{
      try {
        await dispatch(fetchClients());
      } catch (error) {
        console.error(error);
      }
    })();
  }, [dispatch]);

  return (
    <div>
      {/* TODO: add a section where we can filter the user */}
      {clientList && (
        <Table striped bordered hover>
          <thead>
            <tr>
              {headers && headers.map((item) => <th key={item}>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {clientList.map((client)=>(
                <tr key={client.client_id}>
                    {headers && headers.map((head) => (
                        <td key={head}>{client[head.toLowerCase()]}</td>
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
