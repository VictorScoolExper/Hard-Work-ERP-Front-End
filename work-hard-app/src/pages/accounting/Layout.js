import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Layout = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-light"
        style={{ width: "100%" }}
      >
        <div className="container-fluid">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <ul>
            <li>
              <Link to="/accounting">Dashboard</Link>
            </li>
            <li>
              <Link to="/accounting/expense">Expense</Link>
            </li>
            <li>
              <Link to="/accounting/purchase">Purchase</Link>
            </li>
            <li>
              <Link to="/accounting/sale">Sale</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
