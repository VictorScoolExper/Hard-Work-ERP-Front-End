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
      {/* <nav
        className="navbar navbar-expand-lg bg-light"
        style={{ width: "100%" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand">Accounting</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{ marginLeft: "60px" }}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/accounting">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/accounting/expense">
                  Expense
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/accounting/purchase">
                  Purchase
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/accounting/sale">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

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
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/accounting/user/employee">
                  Employee
                </NavDropdown.Item>
              </NavDropdown>
              
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Layout;
