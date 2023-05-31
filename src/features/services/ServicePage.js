import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ServicePage = () => {
  return (
    <div className="row d-flex p-2">
      <div className="col-6">
        <h1>Service</h1>
      </div>
      <div className="col-6 d-flex flex-row">
        <Link to="/service/add?mode=create" className="p-0">
          <Button>Add Service</Button>
        </Link>
      </div>
      <div style={{ marginTop: "30px" }}>
        <h6>Service Table</h6>
        {/* <ServiceTable /> */}
      </div>
    </div>
  );
};

export default ServicePage;
