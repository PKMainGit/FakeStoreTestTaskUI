// src/api/products.ts
import axios from "axios";
import type { Product } from "../types/types";

const API_URL = "http://localhost:5000/api/products";

export interface ProductsParams {
  search?: string;
  category?: string;
  price_min?: number | string;
  price_max?: number | string;
  sort_by?: "name" | "price";
  order?: "asc" | "desc";
}
// --- Fetch products ---
export const fetchProducts = {
  get: async (params?: Record<string, string | number>) => {
    const res = await axios.get<{ products: Product[] }>(API_URL, {
      params,
      withCredentials: true,
    });
    return res.data.products;
  },
  create: async (data: Partial<Product>) => {
    const res = await axios.post<Product>(API_URL, data, {
      withCredentials: true,
    });
    return res.data;
  },
  update: async (id: number, data: Partial<Product>) => {
    const res = await axios.put<Product>(`${API_URL}/${id}`, data, {
      withCredentials: true,
    });
    return res.data;
  },
  delete: async (id: number) => {
    const res = await axios.delete(`${API_URL}/${id}`, {
      withCredentials: true,
    });
    return res.data;
  },
};

// --- Upload images ---
export const uploadImages = async (
  files: File[]
): Promise<{ url: string; public_id: string }[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });

  return response.data.urls;
};

// --- Delete image from cloud ---
export const deleteImage = async (public_id: string): Promise<void> => {
  await axios.post(
    `${API_URL}/upload/delete-image`,
    { public_id },
    { withCredentials: true }
  );
};
