import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import jsPDF from "jspdf";
import type { Category, Product, ReportModalProps } from "../../types/types";

const ReportModal: React.FC<ReportModalProps> = ({
  open,
  onClose,
  reportType,
  reportData,
}) => {
  const handlePrint = () => window.print();

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(14);
    doc.text(
      `Report: ${
        reportType === "categories" ? "Список категорій" : "Список продуктів"
      }`,
      10,
      y
    );
    y += 10;

    if (reportData.length === 0) {
      doc.text("No data available", 10, y);
    } else if (reportType === "categories") {
      (reportData as Category[]).forEach((item) => {
        doc.text(`${item.category}`, 10, y);
        y += 10;
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
      });
    } else {
      (reportData as Product[]).forEach((item) => {
        doc.text(
          `${item.id} | ${item.name} | ${item.category} | $${item.price} | stock: ${item.stock}`,
          10,
          y
        );
        y += 10;
        if (y > 280) {
          doc.addPage();
          y = 10;
        }
      });
    }

    doc.save(`${reportType}_report.pdf`);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {reportType === "categories" ? "Список категорій" : "Список продуктів"}
      </DialogTitle>
      <DialogContent dividers>
        {reportData.length === 0 ? (
          <p>No data available</p>
        ) : reportType === "categories" ? (
          <ul>
            {(reportData as Category[]).map((c) => (
              <li key={c.category}>{c.category}</li>
            ))}
          </ul>
        ) : (
          <ul>
            {(reportData as Product[]).map((p) => (
              <li key={p.id}>
                {p.name} — {p.category} — ${p.price} (stock: {p.stock})
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePrint} color="primary" variant="outlined">
          Print
        </Button>
        <Button
          onClick={handleDownloadPDF}
          color="secondary"
          variant="contained"
        >
          Download PDF
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportModal;
