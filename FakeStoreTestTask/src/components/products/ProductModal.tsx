// src/components/products/ProductModal.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import ProductImageUploader from "./ProductImageUploader";
import { uploadImages, deleteImage } from "../../api/upload";
import type { Product } from "../../types/types";
import {
  validateName,
  validatePrice,
  validateCategory,
  validateStock,
} from "../../utils/validators";

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  onUpload?: (files: FileList | null) => void;
  onDeleteImage?: (index: number) => void;
  product?: Product | null;
  categories: string[];
  loading?: boolean;
}

export interface ProductFormData {
  name: string;
  price: number | "";
  category: string;
  stock: number | "";
  description: string;
  images: File[];
  image_urls: { url: string; public_id: string }[];
}

const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  onSubmit,
  product = null,
  categories,
  loading = false,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    images: [],
    image_urls: [],
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormData, string>>
  >({});

  const [newCategory, setNewCategory] = useState("");
  const newCategoryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        description: product.description || "",
        images: [],
        image_urls: product.image_urls || [],
      });
    } else {
      setFormData({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
        images: [],
        image_urls: [],
      });
    }
    setErrors({});
    setNewCategory("");
  }, [product, open]);

  // -----------------------------
  // Live-валидація при зміні полів
  // -----------------------------
  const handleNameChange = (value: string) => {
    setFormData({ ...formData, name: value });
    setErrors({ ...errors, name: validateName(value) });
  };

  const handlePriceChange = (value: string) => {
    const parsed = value === "" ? "" : Number(value); // "" або число
    setFormData({ ...formData, price: parsed });
    setErrors({ ...errors, price: validatePrice(parsed) });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
    setErrors({ ...errors, category: validateCategory(value) });
  };

  const handleStockChange = (value: string) => {
    const parsed = value === "" ? "" : Number(value); // "" або число
    setFormData({ ...formData, stock: parsed });
    setErrors({ ...errors, stock: validateStock(parsed) });
  };

  const handleSubmit = () => {
    // Перевіряємо всі поля перед сабмітом
    const newErrors: typeof errors = {
      name: validateName(formData.name),
      price: validatePrice(formData.price),
      category: validateCategory(formData.category),
      stock: validateStock(formData.stock),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e)) return;

    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: newCategory || formData.category,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent className="flex flex-col gap-2">
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          disabled={loading}
        />

        <TextField
          label="Price"
          type="number"
          value={formData.price}
          onChange={(e) => handlePriceChange(e.target.value)}
          error={!!errors.price}
          helperText={errors.price}
          disabled={loading}
        />

        <Select
          value={newCategory ? "new" : formData.category}
          onChange={(e) => {
            if (e.target.value === "new") {
              setNewCategory("");
              handleCategoryChange("");
              setTimeout(() => newCategoryRef.current?.focus(), 0);
            } else {
              setNewCategory("");
              handleCategoryChange(e.target.value);
            }
          }}
          displayEmpty
          disabled={loading}
        >
          <MenuItem value="">Select category</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
          <MenuItem value="new">Add new category...</MenuItem>
        </Select>

        {newCategory !== null && (
          <TextField
            label="New Category"
            value={newCategory}
            inputRef={newCategoryRef}
            onChange={(e) => {
              const val = e.target.value.replace(/[^a-zA-Z0-9 ]/g, "");
              const formatted = val.charAt(0).toUpperCase() + val.slice(1);
              setNewCategory(formatted);
              handleCategoryChange(formatted);
            }}
            disabled={loading}
            error={!!errors.category}
            helperText={errors.category}
          />
        )}

        <TextField
          label="Stock"
          type="number"
          value={formData.stock}
          onChange={(e) => handleStockChange(e.target.value)}
          error={!!errors.stock}
          helperText={errors.stock}
          disabled={loading}
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          disabled={loading}
        />

        <ProductImageUploader
          imageUrls={formData.image_urls}
          onUpload={async (files) => {
            if (!files.length) return;
            try {
              const uploaded = await uploadImages(files);
              setFormData({
                ...formData,
                image_urls: [...formData.image_urls, ...uploaded],
              });
            } catch (err) {
              console.error("Upload failed", err);
            }
          }}
          onDelete={async (index) => {
            const img = formData.image_urls[index];
            if (!img) return;
            try {
              await deleteImage(img.public_id);
              setFormData({
                ...formData,
                image_urls: formData.image_urls.filter((_, i) => i !== index),
              });
            } catch (err) {
              console.error("Delete failed", err);
            }
          }}
          loading={loading}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={20} />
          ) : product ? (
            "Save Changes"
          ) : (
            "Add Product"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
