import React from 'react';
import Table from '../components/Table';
import { mockData } from '../api/mockData';

const Customers = () => {
  const headers = ['ID', 'Nome', 'Email'];
  const rows = mockData.customers.map(c => [
    c.id,
    c.name,
    c.email || '—',
  ]);
  return (
    <div className="fade-in p-6 bg-gray-900 min-h-screen">
      <h2 className="text-4xl font-bold text-white mb-8 text-center glass-text">Clientes</h2>
      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default Customers;
