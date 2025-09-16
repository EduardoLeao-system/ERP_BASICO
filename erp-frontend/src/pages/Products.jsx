import { useEffect, useState } from 'react';
import Table from '../components/Table';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const headers = ['ID', 'Nome', 'SKU', 'Preço', 'Estoque'];
  const rows = products.map(p => [
    p.id,
    p.name,
    p.sku,
    `R$ ${p.price.toFixed(2)}`,
    p.stock,
  ]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Produtos</h2>
      <Table headers={headers} rows={rows} />
    </div>
  );
}

export default Products;
