const API_URL = 'http://localhost:5000/api';

// Produtos
export async function getProducts() {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  return res.json();
}

export async function addProduct(product) {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Erro ao adicionar produto');
  return res.json();
}

// Clientes
export async function getCustomers() {
  const res = await fetch(`${API_URL}/customers`);
  if (!res.ok) throw new Error('Erro ao buscar clientes');
  return res.json();
}

export async function addCustomer(customer) {
  const res = await fetch(`${API_URL}/customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer),
  });
  if (!res.ok) throw new Error('Erro ao adicionar cliente');
  return res.json();
}

// ...adicione outras funções conforme necessário...
