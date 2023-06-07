import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const InvoicePage = () => {
  return (
    <div className="container-fluid row p-2">
      {/* TODO: create a dropdown menu similar to invoice zoho */}
      <h1 className="col-6">All Invoices</h1>

      <div className="col-6 d-flex flex-row">
        <Link to="/invoice/add?mode=create" className="p-0">
          <Button>Add Invoice</Button>
        </Link>
      </div>

      <div  style={{ marginTop: "30px" }}>
        <h6>Invoice table</h6>
      </div>
    </div>
  );
};

export default InvoicePage;
