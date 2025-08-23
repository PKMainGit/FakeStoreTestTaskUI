import axios from "axios";
import type { Product, Category } from "../types";

const API_URL = "http://localhost:5000/api";

// --- Get categories report ---
export const fetchCategoriesReport = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>(
    `${API_URL}/reports/categories`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// --- Get products report ---
export const fetchProductsReport = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(`${API_URL}/reports/products`, {
    withCredentials: true,
  });
  return response.data;
};
