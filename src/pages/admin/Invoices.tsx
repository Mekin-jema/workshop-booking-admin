import React from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";

const Invoices: React.FC = () => {
  const invoices = [
    { id: "INV-001", customer: "John Doe", date: "2023-06-10", amount: 120, status: "paid" },
    { id: "INV-002", customer: "Jane Smith", date: "2023-06-15", amount: 180, status: "pending" },
    { id: "INV-003", customer: "Bob Johnson", date: "2023-06-20", amount: 200, status: "paid" },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Invoices</Typography>
      
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>${invoice.amount}</TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        color: invoice.status === 'paid' ? 'success.main' : 'warning.main',
                        fontWeight: 500
                      }}
                    >
                      {invoice.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<DownloadIcon />}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Invoices;
