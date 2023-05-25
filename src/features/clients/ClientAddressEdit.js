import { Link, useParams } from "react-router-dom";
import AddressForm from "../../components/AddressForm";

const ClientAddressEdit = (props) => {
  const {clientId, addressId} = useParams();



  return (
    <div className="container-fluid">
      <div className="row">
        <Link to={`/crm/client/${clientId}/edit`} className="col-1 text-center">
          <i className="bi bi-backspace" style={{ fontSize: "30px" }}></i>
        </Link>
        <h1 className="col-10 text-left">
            Edit Address {addressId}
        </h1>
      </div>
      <div className="container">
        <AddressForm />
      </div>
    </div>
  );
};

export default ClientAddressEdit;
