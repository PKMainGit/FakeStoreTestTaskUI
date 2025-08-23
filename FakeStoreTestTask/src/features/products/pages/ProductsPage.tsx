// src/pages/ProductsPage.tsx
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { fetchProducts as fetchProductsAPI } from "../../../api/products";
import { uploadImages, deleteImage } from "../../../api/upload";

import type { Product, Category, ReportType, ReportData } from "../../../types";
import ProductModal, {
  type ProductFormData,
} from "../components/ProductModal";
import ProductsControls from "../components/ProductsControls";
import ProductsGrid from "../components/ProductsGrid";
import ReportModal from "../../reports/components/ReportModal";
import AppSnackbar from "../../../components/common/AppSnackbar";
import Loader from "../../../components/common/Loader";

import useProductsAndCategories from "../hooks/useProductsAndCategories";
import useSnackbar from "../../../hooks/useSnackbar";

import {
  validateName,
  validatePrice,
  validateCategory,
  validateStock,
} from "../../../utils/validators";

import { useCart } from "../../cart/hooks/useCart";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // ================================
  // Локальні стани контролів
  // ================================
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const [categoryInput, setCategoryInput] = useState(
    searchParams.get("category") || ""
  );
  const [priceMinInput, setPriceMinInput] = useState(
    searchParams.get("price_min") || ""
  );
  const [priceMaxInput, setPriceMaxInput] = useState(
    searchParams.get("price_max") || ""
  );
  const [sortFieldInput, setSortFieldInput] = useState<"name" | "price">(
    (searchParams.get("sort_by") as "name" | "price") || "name"
  );
  const [sortOrderInput, setSortOrderInput] = useState<"asc" | "desc">(
    (searchParams.get("order") as "asc" | "desc") || "asc"
  );
  const [reportInput, setReportInput] = useState<ReportType | "">("");

  // ================================
  // Активні фільтри (для запиту)
  // ================================
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    priceMin: searchParams.get("price_min") || "",
    priceMax: searchParams.get("price_max") || "",
    sortField: (searchParams.get("sort_by") as "name" | "price") || "name",
    sortOrder: (searchParams.get("order") as "asc" | "desc") || "asc",
    report: "" as ReportType | "",
  });

  const { products, categories, loading, refetch } = useProductsAndCategories({
    search: filters.search,
    category: filters.category,
    priceMin: parseFloat(filters.priceMin) || 0,
    priceMax: parseFloat(filters.priceMax) || 0,
    sortBy: filters.sortField,
    order: filters.sortOrder,
  });

  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [report, setReport] = useState<ReportType | "">("");
  const [reportData, setReportData] = useState<ReportData>([]);

  const { addItem } = useCart();

  // ================================
  // Функція застосування фільтрів
  // ================================
  const applyFilters = () => {
    setFilters({
      search: searchInput,
      category: categoryInput,
      priceMin: priceMinInput,
      priceMax: priceMaxInput,
      sortField: sortFieldInput,
      sortOrder: sortOrderInput,
      report: reportInput,
    });

    // Оновлюємо URL
    const params = new URLSearchParams();
    if (searchInput) params.set("search", searchInput);
    if (categoryInput) params.set("category", categoryInput);
    if (priceMinInput) params.set("price_min", priceMinInput);
    if (priceMaxInput) params.set("price_max", priceMaxInput);
    params.set("sort_by", sortFieldInput);
    params.set("order", sortOrderInput);
    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearchInput("");
    setCategoryInput("");
    setPriceMinInput("");
    setPriceMaxInput("");
    setSortFieldInput("name");
    setSortOrderInput("asc");
    setReportInput("");
    setFilters({
      search: "",
      category: "",
      priceMin: "",
      priceMax: "",
      sortField: "name",
      sortOrder: "asc",
      report: "",
    });
    setSearchParams({});
  };

  // ================================
  // Модалка продукту
  // ================================
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setOpenModal(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleSubmitProduct = async (formData: ProductFormData) => {
    const errors = {
      name: validateName(formData.name),
      price: validatePrice(formData.price),
      category: validateCategory(formData.category),
      stock: validateStock(formData.stock),
    };

    if (Object.values(errors).some(Boolean)) {
      Object.values(errors).forEach((e) => e && showSnackbar(e, "error"));
      return false;
    }

    const payload: Partial<Product> = {
      ...formData,
      price: formData.price === "" ? undefined : Number(formData.price),
      stock: formData.stock === "" ? undefined : Number(formData.stock),
    };

    try {
      if (editingProduct) {
        await fetchProductsAPI.update(editingProduct.id, payload);
        showSnackbar("Product updated successfully", "success");
      } else {
        await fetchProductsAPI.create(payload);
        showSnackbar("Product created successfully", "success");
      }
      refetch();
      handleCloseModal();
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to save product", "error");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await fetchProductsAPI.delete(id);
      showSnackbar("Product deleted successfully", "success");
      refetch();
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to delete product", "error");
    }
  };

  const handleUploadImages = async (
    files: FileList | null,
    onSuccess: (urls: { url: string; public_id: string }[]) => void
  ) => {
    if (!files) return;
    try {
      const uploaded = await uploadImages(Array.from(files));
      onSuccess(uploaded);
      showSnackbar("Images uploaded successfully", "success");
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to upload images", "error");
    }
  };

  const handleDeleteImage = async (
    public_id: string,
    onSuccess: () => void
  ) => {
    try {
      await deleteImage(public_id);
      onSuccess();
      showSnackbar("Image deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to delete image", "error");
    }
  };

  const handleReport = async (value: ReportType | "") => {
    setReport(value);
    if (!value) return;

    try {
      if (value === "categories") {
        const uniqueCategories: Category[] = categories.map((cat, index) => ({
          id: index + 1,
          category: cat,
        }));
        setReportData(uniqueCategories);
      } else if (value === "products") {
        setReportData(products);
      }
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to fetch report", "error");
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem({ ...product, quantity: 1 }); // додаємо товар з кількістю 1
    alert(`${product.name} додано до корзини`);
  };

  // ================================
  // Render
  // ================================
  return (
    <div className="p-6">
      <ProductsControls
        search={searchInput}
        category={categoryInput}
        categories={categories}
        priceMin={priceMinInput}
        priceMax={priceMaxInput}
        sortField={sortFieldInput}
        sortOrder={sortOrderInput}
        onSearchChange={setSearchInput}
        onCategoryChange={setCategoryInput}
        onPriceMinChange={setPriceMinInput}
        onPriceMaxChange={setPriceMaxInput}
        onSortFieldChange={setSortFieldInput}
        onSortOrderChange={setSortOrderInput}
        onResetFilters={resetFilters}
        onAddProduct={handleOpenAdd}
        onReportChange={handleReport}
        report={report}
        loading={loading}
      />

      <div className="mb-4">
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Apply Filters
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <ProductsGrid
          products={products}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteProduct}
          onAddToCart={handleAddToCart}
          loading={loading}
        />
      )}

      <ProductModal
        open={openModal}
        onClose={handleCloseModal}
        product={editingProduct}
        categories={categories}
        onSubmit={handleSubmitProduct}
        onUpload={(files: FileList | null) => {
          if (!files) return;
          handleUploadImages(files, (uploadedUrls) => {
            setEditingProduct((prev) =>
              prev
                ? { ...prev, image_urls: [...prev.image_urls, ...uploadedUrls] }
                : null
            );
          });
        }}
        onDeleteImage={(index: number) => {
          const image = editingProduct?.image_urls[index];
          if (!image) return;
          handleDeleteImage(image.public_id, () => {
            setEditingProduct((prev) =>
              prev
                ? {
                    ...prev,
                    image_urls: prev.image_urls.filter((_, i) => i !== index),
                  }
                : null
            );
          });
        }}
      />

      {report && (
        <ReportModal
          open={!!report}
          onClose={() => setReport("")}
          reportType={report as ReportType}
          reportData={reportData}
        />
      )}

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </div>
  );
};

export default ProductsPage;
