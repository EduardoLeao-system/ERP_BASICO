import React from 'react';
import { mockData } from '../api/mockData';

const NewSale = () => (
  <div className="fade-in p-6 bg-gray-900 min-h-screen">
    <h2 className="text-4xl font-bold text-white mb-8 text-center glass-text">
      Nova Venda
    </h2>

    {/* Container principal */}
    <div className="card max-w-5xl mx-auto w-full">
      {/* Seleção de cliente */}
      <label htmlFor="customer-select" className="text-gray-200">
        Cliente:
      </label>
      <select
        id="customer-select"
        className="input bg-gray-700 text-white border-gray-600"
      >
        <option value="">Selecione um cliente</option>
        {mockData.customers.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Itens */}
      <h3 className="text-2xl font-semibold mt-8 mb-4 text-violet-400">
        Itens
      </h3>

      {/* Grid responsivo dos produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.products.map((p) => (
          <div
            key={p.id}
            className="bg-gray-700/50 p-6 rounded-2xl shadow-inner border border-gray-600 flex flex-col items-center product-card hover:scale-105 transition-transform duration-300"
          >
            <span
              className="text-4xl mb-4"
              role="img"
              aria-label="product icon"
            >
              📦
            </span>
            <p className="text-lg font-bold text-white mb-1">{p.name}</p>
            <p className="text-sm text-gray-400 mb-3">
              R$ {p.price.toFixed(2)}
            </p>
            <input
              type="number"
              min="0"
              className="w-20 text-center bg-gray-800 text-white rounded-lg px-2 py-1 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all duration-200"
              defaultValue={0}
            />
          </div>
        ))}
      </div>

      {/* Botão de finalizar */}
      <button className="btn-success mt-10 w-full transform hover:scale-105 duration-300">
        Finalizar Venda
      </button>
    </div>
  </div>
);

export default NewSale;
