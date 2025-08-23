// src/components/products/ProductCard.tsx
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import type { Product } from "../../../types";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onAddToCart: (product: Product) => void; // 🔹 новий пропс
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  onAddToCart, // 🔹 приймаємо пропс
}) => {
  return (
    <Card className="shadow-lg rounded-lg">
      <CardContent>
        <div className="flex justify-between gap-6">
          <div>
            <Typography variant="h6">{product.name}</Typography>
            <Typography color="textSecondary">${product.price}</Typography>
            <Typography color="textSecondary">
              Stock: {product.stock}
            </Typography>
            <Typography color="textSecondary">
              Category: {product.category}
            </Typography>
          </div>
          <div className="flex gap-2 justify-end flex-wrap mt-2">
            {product.image_urls?.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={`product ${idx}`}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onEdit(product)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
