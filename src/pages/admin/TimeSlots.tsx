import React from "react";
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from "@mui/material";
import { Plus } from "lucide-react";

const TimeSlots: React.FC = () => {
  const timeSlots = [
    { id: 1, workshop: "Woodworking Basics", date: "2023-06-15", startTime: "09:00", endTime: "12:00", status: "available" },
    { id: 2, workshop: "Woodworking Basics", date: "2023-06-15", startTime: "13:00", endTime: "16:00", status: "booked" },
    { id: 3, workshop: "Advanced Pottery", date: "2023-06-20", startTime: "10:00", endTime: "13:00", status: "available" },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Time Slots</Typography>
        <Button variant="contained" color="primary" startIcon={<Plus />}>
          Add Time Slot
        </Button>
      </Box>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Workshop</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timeSlots.map((slot) => (
                <TableRow key={slot.id}>
                  <TableCell>{slot.workshop}</TableCell>
                  <TableCell>{slot.date}</TableCell>
                  <TableCell>{slot.startTime} - {slot.endTime}</TableCell>
                  <TableCell>
                    <Chip
                      label={slot.status}
                      color={slot.status === 'available' ? 'success' : 'default'}
                    />
                  </TableCell>
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

export default TimeSlots;
