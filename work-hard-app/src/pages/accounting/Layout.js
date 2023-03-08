import { Outlet, Link } from "react-router-dom";

const LayoutAccounting = () => {
  return (
    <>
      <nav>
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
      </nav>

      <Outlet />
    </>
  )
};

export default LayoutAccounting;