// src/utils/formatters.ts

/**
 * Форматує число у валютний формат USD
 * @param value - число для форматування
 * @returns рядок у форматі $XX.XX
 */
export const formatPrice = (value: number): string => {
  return `$${value.toFixed(2)}`;
};

/**
 * Форматує назву категорії або продукту: перша літера велика, інші маленькі
 * @param value - рядок для форматування
 * @returns відформатований рядок
 */
export const capitalize = (value: string): string => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

/**
 * Перетворює рядок у верхній регістр і видаляє небажані символи
 * @param value - рядок для перетворення
 * @returns відформатований рядок
 */
export const toProductNameFormat = (value: string): string => {
  return value.replace(/[^A-Z0-9 ]/gi, "").toUpperCase();
};

/**
 * Перевіряє, чи є число цілим та невід’ємним
 * @param value - число для перевірки
 * @returns true, якщо число невід’ємне і ціле
 */
export const isNonNegativeInteger = (value: number): boolean => {
  return Number.isInteger(value) && value >= 0;
};
