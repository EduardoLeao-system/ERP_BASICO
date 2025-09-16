import { customers, products } from '../api/mockData';

function NewSale() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Nova Venda (Mock)</h2>
      <p>Cliente:</p>
      <select className="border px-2 py-1 mb-4">
        <option value="">Selecione um cliente</option>
        {customers.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <h3 className="font-semibold mt-4 mb-2">Itens</h3>
      <table className="w-full border table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Produto</th>
            <th className="border px-2 py-1">Preço</th>
            <th className="border px-2 py-1">Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td className="border px-2 py-1">{p.name}</td>
              <td className="border px-2 py-1">R$ {p.price.toFixed(2)}</td>
              <td className="border px-2 py-1">
                <input type="number" min="0" className="w-16 border rounded px-1 py-0.5" defaultValue={0} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Finalizar Venda</button>
    </div>
  );
}

export default NewSale;
