import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        ERP Mini
      </div>
      <ul className="navbar-links">
        <li>
          <Link
            to="/"
            className={`navbar-link${location.pathname === '/' ? ' active' : ''}`}
          >
            Início
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={`navbar-link${location.pathname === '/products' ? ' active' : ''}`}
          >
            Produtos
          </Link>
        </li>
        <li>
          <Link
            to="/customers"
            className={`navbar-link${location.pathname === '/customers' ? ' active' : ''}`}
          >
            Clientes
          </Link>
        </li>
        <li>
          <Link
            to="/sales/new"
            className={`navbar-link${location.pathname === '/sales/new' ? ' active' : ''}`}
          >
            Nova Venda
          </Link>
        </li>
        <li>
          <Link
            to="/report"
            className={`navbar-link${location.pathname === '/report' ? ' active' : ''}`}
          >
            Relatório
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
