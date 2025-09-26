import React from 'react';
import { mockData } from '../api/mockData';

const Report = () => {
  const getCustomerName = (id) => {
    const customer = mockData.customers.find(c => c.id === id);
    return customer ? customer.name : 'Desconhecido';
  };
  return (
    <div className="fade-in p-6 bg-gray-900 min-h-screen">
      <h2 className="text-4xl font-bold text-white mb-8 text-center glass-text">Relatório de Vendas</h2>
      <div className="space-y-6">
        {mockData.sales.map(sale => (
          <div key={sale.id} className="card sale-card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-semibold text-violet-400">Venda #{sale.id}</p>
                <p className="text-lg text-white font-bold">{getCustomerName(sale.customerId)}</p>
                <p className="text-xs text-gray-400">{new Date(sale.date).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-extrabold text-violet-400">R$ {sale.total.toFixed(2)}</span>
              </div>
            </div>
            <p className="mb-2 text-sm font-semibold text-gray-300">Itens:</p>
            <ul className="list-disc pl-6 text-gray-400">
              {sale.items.map((item, idx) => (
                <li key={idx} className="text-sm">{item.name} — {item.qty} x R$ {item.price.toFixed(2)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;
