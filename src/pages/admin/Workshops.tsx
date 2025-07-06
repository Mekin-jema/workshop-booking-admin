import React from "react";
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Workshops: React.FC = () => {
  const workshops = [
    { id: 1, title: "Woodworking Basics", date: "2023-06-15", seats: 12, price: 120, status: "Active" },
    { id: 2, title: "Advanced Pottery", date: "2023-06-20", seats: 8, price: 180, status: "Active" },
    { id: 3, title: "Intro to Welding", date: "2023-06-25", seats: 6, price: 200, status: "Upcoming" },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">All Workshops</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/admin/workshops/create"
        >
          Create Workshop
        </Button>
      </Box>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Seats</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workshops.map((workshop) => (
                <TableRow key={workshop.id}>
                  <TableCell>{workshop.title}</TableCell>
                  <TableCell>{workshop.date}</TableCell>
                  <TableCell>{workshop.seats}</TableCell>
                  <TableCell>${workshop.price}</TableCell>
                  <TableCell>{workshop.status}</TableCell>
                  <TableCell>
                    <Button size="small" color="primary">Edit</Button>
                    <Button size="small" color="secondary">Delete</Button>
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

export default Workshops;
