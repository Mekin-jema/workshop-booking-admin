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
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  MoreVertical,
  Eye,
  XCircle,
  CheckCircle,
  RefreshCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  useCancelBookingMutation,
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation
} from "../../Redux/features/bookings/bookingApiSlice";
import type { Booking } from "../../types";

const AdminBookings: React.FC = () => {
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const { data: bookings = { data: [], meta: { total: 0 } }, isLoading, isError, refetch } = useGetAllBookingsQuery({
    page,
    limit: 10,
  }, {
    refetchOnMountOrArgChange: true
  });

  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  const [cancelBooking] = useCancelBookingMutation();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, booking: Booking) => {
    setAnchorEl(event.currentTarget);
    setSelectedBooking(booking);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedBooking(null);
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedBooking) return;

    try {
      if (newStatus === 'CANCELLED') {
        await cancelBooking(selectedBooking.id).unwrap();
        setSnackbar({
          open: true,
          message: "Booking cancelled successfully",
          severity: "success",
        });
      } else {
        await updateBookingStatus({
          bookingId: selectedBooking.id,
          status: newStatus
        }).unwrap();
        setSnackbar({
          open: true,
          message: `Booking status updated to ${newStatus.toLowerCase()}`,
          severity: "success",
        });
      }
      refetch();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update booking status",
        severity: "error",
      });
    } finally {
      handleMenuClose();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
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
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
        Booking Management
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Box display="flex" justifyContent="center" my={4}>
          <Typography color="error">Error loading bookings</Typography>
        </Box>
      ) : (
        <>
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
                  {bookings.data?.map((booking: Booking) => (
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
                        <IconButton
                          onClick={(e) => handleMenuOpen(e, booking)}
                          size="small"
                          disabled={booking.status === 'CANCELLED'}
                        >
                          <MoreVertical size={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={Math.ceil(bookings.meta.total / 10)}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          onClick={() => handleStatusChange('CONFIRMED')}
          disabled={selectedBooking?.status === 'CONFIRMED'}
        >
          <CheckCircle size={18} style={{ marginRight: 8, color: 'green' }} /> Confirm
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange('CANCELLED')}
          disabled={selectedBooking?.status === 'CANCELLED'}
        >
          <XCircle size={18} style={{ marginRight: 8, color: 'red' }} /> Cancel
        </MenuItem>

      </Menu>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminBookings;