// Dados simulados para teste sem backend
export const products = [
  { id: 1, name: "Camiseta", sku: "CAM001", price: 39.9, stock: 10 },
  { id: 2, name: "Caneca", sku: "CAN001", price: 19.9, stock: 20 },
];

export const customers = [
  { id: 1, name: "Ana Silva", email: "ana@ex.com" },
  { id: 2, name: "Loja XP", email: "contato@xp.com" },
];

export const sales = [
  {
    id: 1,
    date: "2025-09-15T10:00:00Z",
    customerId: 1,
    total: 79.8,
    items: [
      { productId: 1, name: "Camiseta", qty: 2, price: 39.9 },
    ],
  },
  {
    id: 2,
    date: "2025-09-14T15:30:00Z",
    customerId: 2,
    total: 19.9,
    items: [
      { productId: 2, name: "Caneca", qty: 1, price: 19.9 },
    ],
  },
];
