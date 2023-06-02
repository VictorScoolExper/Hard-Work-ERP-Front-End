import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import MaterialTable from "./MaterialTable";

const MaterialPage = () => {
    return (
      <div className="row d-flex p-2">
        <div className="col-6">
          <h1>Material</h1>
        </div>
        <div className="col-6 d-flex flex-row">
          <Link to="/service/material/add?mode=create" className="p-0">
            <Button>Add Material</Button>
          </Link>
        </div>
        <div style={{marginTop: '30px'}}>
          <h6>Material Table</h6>
          <MaterialTable />
        </div>
      </div>
    );
  };
  
  export default MaterialPage;