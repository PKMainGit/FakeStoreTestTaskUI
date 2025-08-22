// src/components/products/ProductsGrid.tsx
import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import type { Product } from "../../types/types";
import ProductCard from "./ProductCard";

interface ProductsGridProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({
  products,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative min-h-[200px]">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={() => onEdit(product)}
            onDelete={() => onDelete(product.id)}
          />
        ))
      ) : (
        <Typography>No products found</Typography>
      )}
    </div>
  );
};

export default ProductsGrid;
