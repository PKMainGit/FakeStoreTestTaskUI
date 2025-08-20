import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products", {
          withCredentials: true,
        });
        setProducts(response.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category ? p.category === category : true)
  );

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-4">
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">All Categories</MenuItem>
          <MenuItem value="electronics">Electronics</MenuItem>
          <MenuItem value="clothing">Clothing</MenuItem>
          {/* Додати інші категорії */}
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="shadow-lg rounded-lg">
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography color="textSecondary">${product.price}</Typography>
              <Typography color="textSecondary">
                Stock: {product.stock}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className="mt-2"
                onClick={() => console.log("Add to order", product.id)}
              >
                Add to Order
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
