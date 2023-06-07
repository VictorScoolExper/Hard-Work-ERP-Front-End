import { Outlet, Link } from "react-router-dom";
import {Navbar, Nav, Container } from "react-bootstrap";

const ScheduleLayout = () => {
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

      <Outlet />
    </>
  );
};

export default ScheduleLayout;