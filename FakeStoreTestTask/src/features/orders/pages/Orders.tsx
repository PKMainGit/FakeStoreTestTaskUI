import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

interface OrderItem {
  product_id: number;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  items: OrderItem[] | null;
  total: number | string;
  created_at: string;
  status?: "pending" | "approved" | "shipped";
  order_items?: OrderItem[]; // додали для TS
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/order", {
        withCredentials: true,
			});
			console.log("Orders response:", response.data);
      setOrders(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error(error.response?.data?.message || "Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleApprove = async (orderId: number) => {
    try {
      await axios.post(
        `http://localhost:5000/api/order/${orderId}/approve`,
        {},
        { withCredentials: true }
      );
      fetchOrders(); // оновлюємо список після затвердження
    } catch (err) {
      console.error("Error approving order", err);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const items = order.order_items || []; // fallback на порожній масив
                const total = Number(order.total) || 0; // перетворюємо total на число
                return (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      {items.map((i) => (
                        <div key={i.product_id}>
                          {i.product_id} x {i.quantity} = {i.price * i.quantity}{" "}
                          PLN
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{total.toFixed(2)} PLN</TableCell>
                    <TableCell>{order.status || "pending"}</TableCell>
                    <TableCell>
                      {order.status === "pending" && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleApprove(order.id)}
                        >
                          Approve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Orders;
