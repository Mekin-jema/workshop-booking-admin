import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Pagination,
  Menu,
  MenuItem
} from "@mui/material";
import {
  MoreVert,
  Visibility,
  Cancel,
  CheckCircle,
  Refresh,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

// Mock data that matches your Prisma schema
const mockBookings = [
  {
    id: 1,
    customer: {
      id: 1,
      name: "John Doe",
      email: "john@example.com"
    },
    workshop: {
      id: 1,
      title: "Advanced JavaScript",
      date: "2023-07-15T00:00:00Z"
    },
    timeSlot: {
      id: 1,
      startTime: "10:00 AM",
      endTime: "12:00 PM"
    },
    status: "CONFIRMED",
    createdAt: "2023-06-10T09:30:00Z"
  },
  {
    id: 2,
    customer: {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com"
    },
    workshop: {
      id: 2,
      title: "Web Development",
      date: "2023-07-20T00:00:00Z"
    },
    timeSlot: {
      id: 2,
      startTime: "02:00 PM",
      endTime: "04:00 PM"
    },
    status: "PENDING",
    createdAt: "2023-06-12T11:45:00Z"
  },
  {
    id: 3,
    customer: {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com"
    },
    workshop: {
      id: 3,
      title: "Data Science",
      date: "2023-07-25T00:00:00Z"
    },
    timeSlot: {
      id: 3,
      startTime: "09:00 AM",
      endTime: "11:00 AM"
    },
    status: "CANCELLED",
    createdAt: "2023-06-15T14:20:00Z"
  }
];

const Bookings: React.FC = () => {
  const [bookings] = useState(mockBookings);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, booking: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedBooking(booking);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBooking(null);
  };

  const handleStatusChange = (newStatus: string) => {
    // In a real app, this would call your API to update the status
    console.log(`Changing booking ${selectedBooking.id} to ${newStatus}`);
    handleMenuClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <Chip
            icon={<CheckCircle fontSize="small" />}
            label="Confirmed"
            color="success"
            size="small"
            variant="outlined"
          />
        );
      case 'PENDING':
        return (
          <Chip
            icon={<Refresh fontSize="small" />}
            label="Pending"
            color="warning"
            size="small"
            variant="outlined"
          />
        );
      case 'CANCELLED':
        return (
          <Chip
            icon={<Cancel fontSize="small" />}
            label="Cancelled"
            color="error"
            size="small"
            variant="outlined"
          />
        );
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bookings Management
        </Typography>

      </Box>

      <Paper elevation={3} sx={{ mb: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Workshop</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time Slot</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <Typography fontWeight="medium">{booking.customer.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {booking.customer.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{booking.workshop.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(booking.workshop.date)}
                    </Typography>
                  </TableCell>
                  <TableCell>{formatDate(booking.createdAt)}</TableCell>
                  <TableCell>
                    {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
                  </TableCell>
                  <TableCell>
                    {getStatusChip(booking.status)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, booking)}
                      size="small"
                    >
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(bookings.length / 10)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleStatusChange('CONFIRMED')} disabled={selectedBooking?.status === 'CONFIRMED'}>
          <CheckCircle color="success" sx={{ mr: 1 }} />
          Confirm
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('CANCELLED')} disabled={selectedBooking?.status === 'CANCELLED'}>
          <Cancel color="error" sx={{ mr: 1 }} />
          Cancel
        </MenuItem>
        <MenuItem component={Link} to={`/admin/bookings/${selectedBooking?.id}`}>
          <Visibility color="info" sx={{ mr: 1 }} />
          View Details
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Bookings;