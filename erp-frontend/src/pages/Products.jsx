import React, { useState } from 'react';
import { mockData } from '../api/mockData';

const Products = () => {
  const [products] = useState(mockData.products);
  return (
    <div className="fade-in p-6 bg-gray-900 min-h-screen">
      <h2 className="text-4xl font-bold text-white mb-8 text-center glass-text">Produtos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(p => (
          <div key={p.id} className="card product-card">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl" role="img" aria-label="product icon">💻</span>
              <div>
                <h3 className="text-xl font-semibold text-white">{p.name}</h3>
                <p className="text-gray-400 text-sm">SKU: {p.sku}</p>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-2xl font-bold text-violet-400">R$ {p.price.toFixed(2)}</span>
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${p.stock > 50 ? 'bg-emerald-500' : p.stock > 20 ? 'bg-yellow-500' : 'bg-rose-500'} text-white`}>
                Estoque: {p.stock}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
