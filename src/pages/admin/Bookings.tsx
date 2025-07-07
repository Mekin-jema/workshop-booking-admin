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
  MenuItem,
} from "@mui/material";
import {
  MoreVertical,
  Eye,
  XCircle,
  CheckCircle,
  RefreshCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGetAllBookingsQuery } from "../../Redux/features/bookings/bookingApiSlice";
import type { Booking } from "../../types";

const AdminBookings: React.FC = () => {
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const { data: bookings = [] } = useGetAllBookingsQuery({}, {
    refetchOnMountOrArgChange: true
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, booking: Booking) => {
    setAnchorEl(event.currentTarget);
    setSelectedBooking(booking);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBooking(null);
  };

  const handleStatusChange = (newStatus: string) => {
    console.log(`Changing booking ${selectedBooking?.id} to ${newStatus}`);
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
            icon={<CheckCircle size={16} />}
            label="Confirmed"
            color="success"
            size="small"
            variant="outlined"
          />
        );
      case 'PENDING':
        return (
          <Chip
            icon={<RefreshCcw size={16} />}
            label="Pending"
            color="warning"
            size="small"
            variant="outlined"
          />
        );
      case 'CANCELLED':
        return (
          <Chip
            icon={<XCircle size={16} />}
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
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Booking Management
      </Typography>
      <Paper elevation={3}>
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
              {bookings?.data?.map((booking: Booking) => (
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
                  <TableCell>{getStatusChip(booking.status)}</TableCell>
                  <TableCell>
                    <IconButton onClick={(e) => handleMenuOpen(e, booking)} size="small">
                      <MoreVertical size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={Math.ceil(bookings.length / 10)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleStatusChange('CONFIRMED')} disabled={selectedBooking?.status === 'CONFIRMED'}>
          <CheckCircle size={18} style={{ marginRight: 8, color: 'green' }} /> Confirm
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('CANCELLED')} disabled={selectedBooking?.status === 'CANCELLED'}>
          <XCircle size={18} style={{ marginRight: 8, color: 'red' }} /> Cancel
        </MenuItem>
        <MenuItem component={Link} to={`/admin/bookings/${selectedBooking?.id}`}>
          <Eye size={18} style={{ marginRight: 8, color: 'blue' }} /> View Details
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default AdminBookings;
