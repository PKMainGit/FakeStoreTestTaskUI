// src/types/types.ts
export interface Category {
  id: number;
  category: string;
}

export interface Product {
  id: number;
  external_id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image_urls: { url: string; public_id: string }[];
  created_at: string;
  quantity?: number;
}
// Union для report
export type ReportData = Category[] | Product[];

export type ReportType = "categories" | "products";

export interface ReportModalProps {
  open: boolean;
  onClose: () => void;
  reportType: ReportType;
  reportData: ReportData;
}