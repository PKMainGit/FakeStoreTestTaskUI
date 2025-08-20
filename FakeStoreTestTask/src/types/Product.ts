// src/types/Product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity?: number; // кількість товару у корзині
}
