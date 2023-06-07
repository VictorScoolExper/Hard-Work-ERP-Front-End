import { Outlet, Link } from "react-router-dom";
import {Navbar, Nav, Container } from "react-bootstrap";

const InvoiceLayout = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Invoice</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/invoice-dash">
                Dashboard
              </Nav.Link>
              {/* <Nav.Link as={Link} to="/quotes">
                Quotes
              </Nav.Link> */}
              <Nav.Link as={Link} to="/invoice">
                Invoice
              </Nav.Link>
              <Nav.Link as={Link} to="/payments-recieved">
                Payments Recieved
              </Nav.Link>
              <Nav.Link as={Link} to="/timesheet">
                Timesheet
              </Nav.Link>
              <Nav.Link as={Link} to="/invoice-reports">
                Report
              </Nav.Link>
              
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default InvoiceLayout;