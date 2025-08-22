// src/hooks/useProductsAndCategories.ts
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import type { Product } from "../types/types";

interface UseProductsParams {
  search?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  sortBy?: "name" | "price";
  order?: "asc" | "desc";
}

interface UseProductsAndCategoriesResult {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useProductsAndCategories = ({
  search = "",
  category = "",
  priceMin,
  priceMax,
  sortBy,
  order,
}: UseProductsParams): UseProductsAndCategoriesResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams: Record<string, string | number> = {};
      if (search) queryParams.search = search;
      if (category) queryParams.category = category;
      if (priceMin !== undefined && priceMin > 0)
        queryParams.price_min = priceMin;
      if (priceMax !== undefined && priceMax > 0)
        queryParams.price_max = priceMax;
      if (sortBy) queryParams.sort_by = sortBy;
      if (order) queryParams.order = order;

      const response = await axios.get<{ products: Product[] }>(
        "http://localhost:5000/api/products",
        { params: queryParams, withCredentials: true }
      );
			console.log(response.data);
      const allProducts = response.data.products;
      setProducts(allProducts);

      const uniqueCategories = Array.from(
        new Set(allProducts.map((p) => p.category))
      );
			setCategories(uniqueCategories);
			console.log(uniqueCategories);
    } catch (err) {
      console.error("Failed to fetch products or categories", err);
      setError("Failed to fetch products or categories");
    } finally {
      setLoading(false);
    }
  }, [search, category, priceMin, priceMax, sortBy, order]); // лише примітиви

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { products, categories, loading, error, refetch: fetchAll };
};

export default useProductsAndCategories;
