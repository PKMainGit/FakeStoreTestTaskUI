import axios from "axios";

const API_URL = "http://localhost:5000/api/upload";

export interface UploadedImage {
  url: string;
  public_id: string;
}

// --- Upload images ---
export const uploadImages = async (files: File[]): Promise<UploadedImage[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const response = await axios.post<{ urls: UploadedImage[] }>(
    API_URL,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
      timeout: 30000,
    }
  );

  return response.data.urls;
};

// --- Delete image by public_id ---
export const deleteImage = async (public_id: string): Promise<void> => {
  await axios.post(
    `${API_URL}/delete-image`,
    { public_id },
    {
      withCredentials: true,
      timeout: 30000,
    }
  );
};
