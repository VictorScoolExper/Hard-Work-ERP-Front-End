import useFetch from "../hooks/use-fetch";
import { getMaterials } from "../features/materials/materialSlice";
import { getServices } from "../features/services/serviceSlice";
import { fetchAllEmployees } from "../features/employees/employeeSlice";

import { Outlet, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const ScheduleLayout = () => {
  const { loading: materialLoading, error: materialError } = useFetch(
    getMaterials()
  );

  const { loading: serviceLoading, error: serviceError } = useFetch(
    getServices()
  );

  const { loading: employeeLoading, error: employeeError } = useFetch(
    fetchAllEmployees()
  );

  const hello = "hello bitch";

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Schedule</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/schedule">
                Calendar
              </Nav.Link>
              <Nav.Link as={Link} to="/schedule/add">
                Schedule Service
              </Nav.Link>
              {/* <Nav.Link as={Link} to="">
                Report
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {materialError !== null &&
      serviceError !== null &&
      employeeError !== null ? (
        <div>
          <h1>Loading</h1>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default ScheduleLayout;
