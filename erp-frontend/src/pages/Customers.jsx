import { customers } from '../api/mockData';
import Table from '../components/Table';

function Customers() {
  const headers = ['ID', 'Nome', 'Email'];
  const rows = customers.map(c => [
    c.id,
    c.name,
    c.email || '—',
  ]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Clientes</h2>
      <Table headers={headers} rows={rows} />
    </div>
  );
}

export default Customers;
