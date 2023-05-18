import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

import ClientTable from "./ClientTable";

const ClientPage = () => {
  return (
    <div className="row d-flex p-2">
      <div className="col-6">
        <h1>Client</h1>
      </div>
      <div className="col-6 d-flex flex-row">
        <Link to="/crm/client/add" className="p-0">
          <Button>Add Client</Button>
        </Link>
      </div>
      <div style={{marginTop: '30px'}}>
        <h6>Client Table</h6>
        <ClientTable />
      </div>
    </div>
  );
};

export default ClientPage;
