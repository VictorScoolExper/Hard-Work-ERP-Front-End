import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CompanyTable from "./CompanyTable";

const CompanyPage = () => {
  return (
    <div className="row d-flex p-2">
      <div className="col-6">
        <h1>Company</h1>
      </div>
      <div className="col-6 d-flex flex-row">
        <Link to="/crm/company/add?mode=create" className="p-0">
          <Button>Add Company</Button>
        </Link>
      </div>
      <div style={{marginTop: '30px'}}>
        <h6>Company Table</h6>
        <CompanyTable />
      </div>
    </div>
  );
};

export default CompanyPage;