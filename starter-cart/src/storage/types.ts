// Types de lignes SQL pour mapper proprement les resultats PostgreSQL.
export type ProductRow = {
  id: string;
  name: string;
  price: number | string;
};

export type StockRow = {
  stock: number | string;
};

export type CartRow = {
  id: string;
  name: string;
  price: number | string;
  quantity: number | string;
};
