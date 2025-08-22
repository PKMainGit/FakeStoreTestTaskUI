// src/components/products/ProductsControls.tsx
import React from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
} from "@mui/material";
import type { ReportType } from "../../types/types";

interface ProductsControlsProps {
  search: string;
  category: string;
  priceMin: string;
  priceMax: string;
  sortField: "name" | "price";
  sortOrder: "asc" | "desc";
  categories: string[];
  report: ReportType | "";
  loading?: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPriceMinChange: (value: string) => void;
  onPriceMaxChange: (value: string) => void;
  onSortFieldChange: (value: "name" | "price") => void;
  onSortOrderChange: (value: "asc" | "desc") => void;
  onResetFilters: () => void;
  onAddProduct: () => void;
  onReportChange: (value: ReportType | "") => void;
}

const ProductsControls: React.FC<ProductsControlsProps> = ({
  search,
  category,
  priceMin,
  priceMax,
  sortField,
  sortOrder,
  categories,
  report,
  loading = false,
  onSearchChange,
  onCategoryChange,
  onPriceMinChange,
  onPriceMaxChange,
  onSortFieldChange,
  onSortOrderChange,
  onResetFilters,
  onAddProduct,
  onReportChange,
}) => {
  return (
    <div className="flex gap-4 mb-4 flex-wrap">
      <TextField
        label="Search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        disabled={loading}
      />
      <Select
        value={category || ""}
        onChange={(e) => onCategoryChange(e.target.value)}
        displayEmpty
        style={{ minWidth: 150 }}
        disabled={loading}
      >
        <MenuItem value="">All Categories</MenuItem>
        {categories.map((c) => (
          <MenuItem key={c} value={c}>
            {c}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Price min"
        type="number"
        value={priceMin}
        onChange={(e) => onPriceMinChange(e.target.value)}
        disabled={loading}
      />
      <TextField
        label="Price max"
        type="number"
        value={priceMax}
        onChange={(e) => onPriceMaxChange(e.target.value)}
        disabled={loading}
      />
      <Select
        value={sortField}
        onChange={(e) => onSortFieldChange(e.target.value as "name" | "price")}
        disabled={loading}
      >
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="price">Price</MenuItem>
      </Select>
      <Select
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value as "asc" | "desc")}
        disabled={loading}
      >
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
      <Button
        variant="outlined"
        color="secondary"
        onClick={onResetFilters}
        disabled={loading}
      >
        Reset Filters
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={onAddProduct}
        disabled={loading}
      >
        Add Product
      </Button>
      <FormControl disabled={loading}>
        <Select
          value={report}
          onChange={(e) => onReportChange(e.target.value as ReportType)}
          displayEmpty
          renderValue={(selected: ReportType | "") =>
            selected === ""
              ? "Reports"
              : selected === "categories"
              ? "Список категорій"
              : "Список продуктів"
          }
        >
          <MenuItem value="categories">Список категорій</MenuItem>
          <MenuItem value="products">Список продуктів</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default ProductsControls;
