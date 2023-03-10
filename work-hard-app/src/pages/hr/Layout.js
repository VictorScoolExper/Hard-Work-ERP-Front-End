import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Layout = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">HR</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/hr">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/hr/employee">
                Employee
              </Nav.Link>
              <Nav.Link as={Link} to="/hr/crew">
                Crew
              </Nav.Link>
              <NavDropdown title="Attendance" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/hr/attend">
                  Attendance
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/hr/shift">
                  Shift
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Payroll" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/hr/payroll">
                  Payroll
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/hr/payroll/report">
                  Report
                </NavDropdown.Item>
              </NavDropdown>
              
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Layout;