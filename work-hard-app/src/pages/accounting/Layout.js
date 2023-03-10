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
          <Navbar.Brand href="#">Accounting</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/accounting">
                Dashboard
              </Nav.Link>
              <NavDropdown title="Users" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/accounting/user/customer">
                  Customer
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/accounting/user/vendor">
                  Vendor
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/accounting/user/employee">
                  Employee
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Transactions" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/accounting/trans/dash">
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/accounting/trans/sale">
                  Sale
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/accounting/trans/expense">
                  Expense
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/accounting/trans/purchase">
                  Purchase
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/accounting/report">
                Report
              </Nav.Link>
              <Nav.Link as={Link} to="/accounting/setting">
                Settings
              </Nav.Link>
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Layout;
