// src/components/common/Loader.tsx
import React from "react";
import { CircularProgress, Box } from "@mui/material";

interface LoaderProps {
  size?: number;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = 40, fullScreen = false }) => {
  return fullScreen ? (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.7)",
        zIndex: 1300,
      }}
    >
      <CircularProgress size={size} />
    </Box>
  ) : (
    <CircularProgress size={size} />
  );
};

export default Loader;
