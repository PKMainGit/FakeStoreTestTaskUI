// src/validators/productValidators.ts

/**
 * Перевіряє назву продукту
 * - обов'язково
 * - тільки великі літери, цифри і пробіли
 */
export const validateName = (name: string): string | undefined => {
  const trimmed = name.trim();
  if (!trimmed) return "Name is required";

  const formatted = trimmed.toUpperCase();
  if (!/^[A-Z0-9 ]+$/.test(formatted)) {
    return "Name must contain only uppercase letters, numbers and spaces";
  }

  return undefined;
};

/**
 * Перевіряє ціну продукту
 * - обов'язково
 * - більше 0
 * - максимум 2 знаки після коми
 */
export const validatePrice = (
  price: number | string | null | undefined
): string | undefined => {
  if (price === null || price === undefined || price === "") {
    return "Price is required";
  }

  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num) || num <= 0) return "Price must be greater than 0";

  if (!/^\d+(\.\d{1,2})?$/.test(num.toString())) {
    return "Price must be a number with maximum 2 decimal places";
  }

  return undefined;
};

/**
 * Перевіряє категорію продукту
 * - обов'язково
 * - перша літера велика, далі літери, цифри, пробіли
 */
export const validateCategory = (category: string): string | undefined => {
  const trimmed = category.trim();
  if (!trimmed) return "Category is required";

  if (!/^[A-Z][A-Za-z0-9 ]*$/.test(trimmed)) {
    return "Category must start with a capital letter and contain only letters, numbers, spaces";
  }

  return undefined;
};

/**
 * Перевіряє кількість продукту на складі
 * - обов'язково
 * - невід'ємне ціле число
 */
export const validateStock = (
  stock: number | string | null | undefined
): string | undefined => {
  if (stock === null || stock === undefined || stock === "")
    return "Stock is required";

  const num = typeof stock === "string" ? parseInt(stock) : stock;
  if (isNaN(num) || !Number.isInteger(num) || num < 0) {
    return "Stock must be a non-negative integer";
  }

  return undefined;
};
