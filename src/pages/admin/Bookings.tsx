import React from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button } from "@mui/material";

const Bookings: React.FC = () => {
  const bookings = [
    { id: 1, customer: "John Doe", workshop: "Woodworking Basics", date: "2023-06-15", time: "09:00-12:00", status: "confirmed", price: 120 },
    { id: 2, customer: "Jane Smith", workshop: "Advanced Pottery", date: "2023-06-20", time: "10:00-13:00", status: "pending", price: 180 },
    { id: 3, customer: "Bob Johnson", workshop: "Intro to Welding", date: "2023-06-25", time: "14:00-17:00", status: "cancelled", price: 200 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>All Bookings</Typography>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Workshop</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.customer}</TableCell>
                  <TableCell>{booking.workshop}</TableCell>
                  <TableCell>{booking.date} ({booking.time})</TableCell>
                  <TableCell>${booking.price}</TableCell>
                  <TableCell>
                    <Chip
                      label={booking.status}
                      color={
                        booking.status === 'confirmed' ? 'success' :
                          booking.status === 'pending' ? 'warning' : 'error'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" color="primary">View</Button>
                    <Button size="small" color="secondary">Cancel</Button>
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

export default Bookings;
