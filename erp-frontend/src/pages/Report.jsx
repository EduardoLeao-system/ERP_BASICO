import { sales, customers } from '../api/mockData';

function Report() {
  const getCustomerName = (id) => {
    const customer = customers.find(c => c.id === id);
    return customer ? customer.name : 'Desconhecido';
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Relatório de Vendas</h2>
      {sales.map(sale => (
        <div key={sale.id} className="border rounded p-4 mb-4 bg-white shadow-sm">
          <p><strong>ID:</strong> {sale.id}</p>
          <p><strong>Data:</strong> {new Date(sale.date).toLocaleString()}</p>
          <p><strong>Cliente:</strong> {getCustomerName(sale.customerId)}</p>
          <p><strong>Total:</strong> R$ {sale.total.toFixed(2)}</p>
          <p><strong>Itens:</strong></p>
          <ul className="list-disc pl-6">
            {sale.items.map((item, idx) => (
              <li key={idx}>{item.name} — {item.qty} x R$ {item.price.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Report;
