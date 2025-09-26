export const mockData = {
  customers: [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com' },
    { id: 3, name: 'Carlos Santos', email: 'carlos@example.com' },
  ],
  products: [
    { id: 101, name: 'Teclado Mecânico', sku: 'TM-001', price: 250.00, stock: 45 },
    { id: 102, name: 'Mouse Gamer', sku: 'MG-002', price: 120.50, stock: 78 },
    { id: 103, name: 'Monitor Ultrawide', sku: 'MU-003', price: 1800.99, stock: 22 },
  ],
  sales: [
    { id: 1001, customerId: 1, date: '2023-10-25T10:00:00Z', total: 370.50, items: [{ name: 'Teclado Mecânico', qty: 1, price: 250.00 }, { name: 'Mouse Gamer', qty: 1, price: 120.50 }] },
    { id: 1002, customerId: 2, date: '2023-10-24T15:30:00Z', total: 1800.99, items: [{ name: 'Monitor Ultrawide', qty: 1, price: 1800.99 }] },
  ],
};
