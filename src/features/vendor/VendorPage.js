import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const VendorPage = () => {
  return (
    <div className="row d-flex p-2">
      <div className="col-6">
        <h1>Vendor</h1>
      </div>
      <div className="col-6 d-flex flex-row">
        <Link to="/crm/vendor/add?mode=create" className="p-0">
          <Button>Add Vendor</Button>
        </Link>
      </div>
      <div style={{marginTop: '30px'}}>
        <h6>Vendor Table</h6>
        {/* <CompanyTable /> */}
      </div>
    </div>
  );
};

export default VendorPage;