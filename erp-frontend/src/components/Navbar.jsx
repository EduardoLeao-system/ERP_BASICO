import React from 'react';

const Navbar = ({ setPage }) => (
  <nav className="navbar">
    <div className="flex-1">
      <h1 className="text-3xl font-bold glass-text">
        <span className="text-violet-400">ERP</span> Mini
      </h1>
    </div>
    <div className="flex-none flex items-center space-x-2 sm:space-x-4">
      <a href="#" onClick={() => setPage('customers')}>Clientes</a>
      <a href="#" onClick={() => setPage('products')}>Produtos</a>
      <a href="#" onClick={() => setPage('newSale')}>Nova Venda</a>
      <a href="#" onClick={() => setPage('report')}>Relatório</a>
    </div>
  </nav>
);

export default Navbar;
