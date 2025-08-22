// src/components/Statistics.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

interface ItemStats {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

interface SalesStats {
  count: number;
  total: number;
  clients: number;
}

interface Stats {
  storeItems: ItemStats[];
  warehouseItems: ItemStats[];
  sales: {
    today: SalesStats;
    week: SalesStats;
    month: SalesStats;
    year: SalesStats;
  };
}

const Statistics = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/stats", {
          withCredentials: true,
        });
        setStats(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Завантаження статистики...</p>;

  return (
    <div className="p-6 space-y-6">
      <Typography variant="h4" gutterBottom>
        Статистика магазину
      </Typography>

      {/* Стан товарів */}
      <Card className="p-4">
        <CardContent>
          <Typography variant="h5">Стан товарів</Typography>
          <Divider className="my-2" />

          {/* Магазин */}
          <Typography variant="h6" className="mt-2">
            Магазин
          </Typography>
          {
            <TableContainer component={Paper} className="mt-2">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Назва</TableCell>
                    <TableCell>Кількість</TableCell>
                    <TableCell>Ціна за одиницю</TableCell>
                    <TableCell>Вартість (нетто)</TableCell>
                    <TableCell>Вартість (брутто)</TableCell>
                    <TableCell>ПДВ</TableCell>
                    <TableCell>Категорія</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.storeItems.map((item: ItemStats) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price.toFixed(2)} PLN</TableCell>
                      <TableCell>
                        {(item.price * item.quantity).toFixed(2)} PLN
                      </TableCell>
                      <TableCell>
                        {(item.price * item.quantity * 1.23).toFixed(2)} PLN
                      </TableCell>
                      <TableCell>
                        {(item.price * item.quantity * 0.23).toFixed(2)} PLN
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          }

          {/* Склад */}
          <Typography variant="h6" className="mt-4">
            Склад
          </Typography>
          {
            <TableContainer component={Paper} className="mt-2">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Назва</TableCell>
                    <TableCell>Кількість</TableCell>
                    <TableCell>Ціна за одиницю</TableCell>
                    <TableCell>Вартість (нетто)</TableCell>
                    <TableCell>Вартість (брутто)</TableCell>
                    <TableCell>ПДВ</TableCell>
                    <TableCell>Категорія</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.warehouseItems.map((item: ItemStats) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price.toFixed(2)} PLN</TableCell>
                      <TableCell>
                        {(item.price * item.quantity).toFixed(2)} PLN
                      </TableCell>
                      <TableCell>
                        {(item.price * item.quantity * 1.23).toFixed(2)} PLN
                      </TableCell>
                      <TableCell>
                        {(item.price * item.quantity * 0.23).toFixed(2)} PLN
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          }

          {/* Продажі */}
          <Typography variant="h6" className="mt-4">
            Продажі
          </Typography>
          {
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <Card className="p-4">
                <Typography variant="subtitle1">Сьогодні</Typography>
                <Typography>Продажів: {stats.sales.today.count}</Typography>
                <Typography>
                  Сума: {stats.sales.today.total.toFixed(2)} PLN
                </Typography>
                <Typography>Клієнтів: {stats.sales.today.clients}</Typography>
              </Card>
              <Card className="p-4">
                <Typography variant="subtitle1">Цього тижня</Typography>
                <Typography>Продажів: {stats.sales.week.count}</Typography>
                <Typography>
                  Сума: {stats.sales.week.total.toFixed(2)} PLN
                </Typography>
                <Typography>Клієнтів: {stats.sales.week.clients}</Typography>
              </Card>
              <Card className="p-4">
                <Typography variant="subtitle1">Цього місяця</Typography>
                <Typography>Продажів: {stats.sales.month.count}</Typography>
                <Typography>
                  Сума: {stats.sales.month.total.toFixed(2)} PLN
                </Typography>
                <Typography>Клієнтів: {stats.sales.month.clients}</Typography>
              </Card>
            </div>
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
