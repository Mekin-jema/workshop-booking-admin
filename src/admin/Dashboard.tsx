import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress
} from "@mui/material";
import {
  Bell,
  Calendar,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Plus
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Link } from "react-router-dom";
import type { Booking, Workshop } from "../types";
import { useGetWorkshopsQuery } from "../Redux/features/workshops/workshopApiSlice";
import { useGetAllBookingsQuery } from "../Redux/features/bookings/bookingApiSlice";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  // Fetch data from APIs
  const {
    data: workshopsData = [],
    isLoading: isWorkshopsLoading,
    // isError: isWorkshopsError,
    refetch: refetchWorkshops
  } = useGetWorkshopsQuery({}, { refetchOnMountOrArgChange: true });

  const {
    data: bookingsData = { data: [], meta: { total: 0 } },
    isLoading: isBookingsLoading,
    // isError: isBookingsError,
    refetch: refetchBookings
  } = useGetAllBookingsQuery({}, { refetchOnMountOrArgChange: true });

  const [stats, setStats] = useState({
    totalBookings: 0,
    totalWorkshops: 0,
    popularWorkshop: {
      title: "",
      bookings: 0
    }
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [upcomingWorkshops, setUpcomingWorkshops] = useState([]);

  const user = {
    name: "Admin User",
    role: "ADMIN",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  // Calculate statistics when data changes
  useEffect(() => {
    if (bookingsData.data && workshopsData) {
      // Calculate total bookings
      const totalBookings = bookingsData.meta.total;

      // Calculate active workshops (non-deleted)
      const activeWorkshops = workshopsData.filter((workshop: Workshop) => !workshop.isDeleted);

      // Calculate popular workshop
      const workshopBookingCounts: { [title: string]: number } = {};
      bookingsData.data.forEach((booking: Booking) => {
        const workshopTitle = booking.workshop.title;
        workshopBookingCounts[workshopTitle] = (workshopBookingCounts[workshopTitle] || 0) + 1;
      });

      let popularWorkshop = { title: "", bookings: 0 };
      Object.entries(workshopBookingCounts).forEach(([title, count]) => {
        if (count > popularWorkshop.bookings) {
          popularWorkshop = { title, bookings: count };
        }
      });

      setStats({
        totalBookings,
        totalWorkshops: activeWorkshops.length,
        popularWorkshop
      });

      // Set recent bookings (first 4 from the response)
      setRecentBookings(bookingsData.data.slice(0, 4));

      // Set upcoming workshops (filter non-deleted and future dates)
      const now = new Date();
      const upcoming = workshopsData
        .filter((workshop: Workshop) => !workshop.isDeleted && new Date(workshop.date) > now)
        .sort((a: Workshop, b: Workshop) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 3);
      setUpcomingWorkshops(upcoming);
    }
  }, [bookingsData, workshopsData]);

  const handleRefresh = () => {
    refetchWorkshops();
    refetchBookings();
  };

  const getStatusChip = (status: string): React.ReactNode => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <Chip
            icon={<CheckCircle size={16} />}
            label="Confirmed"
            color="success"
            size="small"
          />
        );
      case 'PENDING':
        return (
          <Chip
            icon={<AlertCircle size={16} />}
            label="Pending"
            color="warning"
            size="small"
          />
        );
      case 'CANCELLED':
        return (
          <Chip
            icon={<XCircle size={16} />}
            label="Cancelled"
            color="error"
            size="small"
          />
        );
      default:
        return null;
    }
  };

  // Generate booking trend data (mock data for now)
  const bookingData = [
    { name: "Jan", bookings: 40 },
    { name: "Feb", bookings: 65 },
    { name: "Mar", bookings: 78 },
    { name: "Apr", bookings: 90 },
    { name: "May", bookings: 110 },
    { name: "Jun", bookings: stats.totalBookings || 0 },
  ];

  // Generate workshop popularity data
  const workshopData = stats.popularWorkshop.title ? [
    { name: stats.popularWorkshop.title, value: stats.popularWorkshop.bookings },
    { name: "Other Workshops", value: stats.totalBookings - stats.popularWorkshop.bookings }
  ] : [];

  const isLoading = isWorkshopsLoading || isBookingsLoading;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Dashboard Overview
        </Typography>

      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Stats Cards */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                Total Bookings
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Users size={24} color="#673AB7" />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {stats.totalBookings}
                </Typography>
              </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                Active Workshops
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Calendar size={24} color="#673AB7" />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {stats.totalWorkshops}
                </Typography>
              </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                Popular Workshop
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle size={24} color="#673AB7" />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {stats.popularWorkshop.title || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    {stats.popularWorkshop.bookings} bookings
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                Recent Activity
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Clock size={24} color="#673AB7" />
                <Typography variant="body1">
                  {recentBookings.length} new bookings
                </Typography>
              </Box>
            </Paper>
          </Box>

          {/* Charts Section */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 3, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Bookings Trend</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bookingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#673AB7"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Workshop Popularity</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={workshopData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                    >
                      {workshopData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Box>

          {/* Recent Bookings Table */}
          <Paper elevation={3} sx={{ mb: 4, borderRadius: 2 }}>
            <Box sx={{
              p: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid',
              borderColor: 'divider'
            }}>
              <Typography variant="h6">Recent Bookings</Typography>
              <Button
                component={Link}
                to="/admin/bookings"
                variant="text"
                color="primary"
                size="small"
              >
                View All
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer</TableCell>
                    <TableCell>Workshop</TableCell>
                    <TableCell>Date/Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentBookings.map((booking: Booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <Typography fontWeight={500}>{booking.customer.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {booking.customer.email}
                        </Typography>
                      </TableCell>
                      <TableCell>{booking.workshop.title}</TableCell>
                      <TableCell>
                        <Typography>
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {getStatusChip(booking.status)}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          component={Link}
                          to={`/admin/bookings/${booking.id}`}
                        >
                          Manage
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* Upcoming Workshops */}
          <Paper elevation={3} sx={{ borderRadius: 2 }}>
            <Box sx={{
              p: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid',
              borderColor: 'divider'
            }}>
              <Typography variant="h6">Upcoming Workshops</Typography>
              <Box>
                <Button
                  component={Link}
                  to="/admin/workshops"
                  variant="text"
                  color="primary"
                  size="small"
                  sx={{ mr: 2 }}
                >
                  View All
                </Button>

              </Box>
            </Box>
            <Box sx={{ p: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
              {upcomingWorkshops.map((workshop: Workshop) => (
                <Paper key={workshop.id} elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">{workshop.title}</Typography>
                    <Chip
                      label={`${workshop.maxCapacity - workshop.timeSlots.reduce((sum, slot) => sum + slot.availableSpots, 0)}/${workshop.maxCapacity}`}
                      size="small"
                      color="primary"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {workshop.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <Calendar size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                    {new Date(workshop.date).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {workshop.timeSlots.map(slot => (
                      <Chip
                        key={slot.id}
                        label={`${slot.startTime} - ${slot.endTime} (${slot.availableSpots} left)`}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    component={Link}
                    to={`/admin/workshops/${workshop.id}`}
                  >
                    Manage Workshop
                  </Button>
                </Paper>
              ))}
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Dashboard; 