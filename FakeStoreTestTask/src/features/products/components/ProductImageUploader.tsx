// src/components/products/ProductImageUploader.tsx
import React, { useRef } from "react";
import { Button, CircularProgress } from "@mui/material";

interface UploadedImage {
  url: string;
  public_id: string;
}

interface ProductImageUploaderProps {
  imageUrls: UploadedImage[];
  onUpload: (files: File[]) => void;
  onDelete: (index: number) => void;
  loading?: boolean;
}

const ProductImageUploader: React.FC<ProductImageUploaderProps> = ({
  imageUrls,
  onUpload,
  onDelete,
  loading = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outlined"
        color="primary"
        onClick={() => fileInputRef.current?.click()}
        disabled={loading}
      >
        {loading ? <CircularProgress size={20} /> : "Add Photos"}
      </Button>
      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={(e) =>
          onUpload(e.target.files ? Array.from(e.target.files) : [])
        }
        disabled={loading}
      />

      <div className="flex gap-2 mt-2">
        {imageUrls?.map((img, idx) => (
          <div key={idx} style={{ position: "relative" }}>
            <img
              src={img.url}
              alt={`preview ${idx}`}
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
            <button
              onClick={() => onDelete(idx)}
              style={{
                position: "absolute",
                top: -5,
                right: -5,
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: 20,
                height: 20,
                cursor: "pointer",
              }}
              disabled={loading}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageUploader;
