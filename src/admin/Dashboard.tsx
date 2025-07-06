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

// Mock data that matches your Prisma schema
const mockStats = {
  totalBookings: 124,
  totalWorkshops: 8,
  popularWorkshop: {
    title: "Advanced JavaScript",
    bookings: 45
  }
};

const mockRecentBookings = [
  {
    id: 1,
    customer: {
      name: "Alice Smith",
      email: "alice@example.com"
    },
    workshop: {
      title: "Advanced JavaScript"
    },
    timeSlot: {
      startTime: "10:00 AM",
      endTime: "12:00 PM"
    },
    status: "CONFIRMED",
    createdAt: "2023-07-15T09:30:00Z"
  },
  {
    id: 2,
    customer: {
      name: "Bob Johnson",
      email: "bob@example.com"
    },
    workshop: {
      title: "Web Development"
    },
    timeSlot: {
      startTime: "02:00 PM",
      endTime: "04:00 PM"
    },
    status: "PENDING",
    createdAt: "2023-07-16T11:45:00Z"
  },
  {
    id: 3,
    customer: {
      name: "Charlie Brown",
      email: "charlie@example.com"
    },
    workshop: {
      title: "Data Science"
    },
    timeSlot: {
      startTime: "09:00 AM",
      endTime: "11:00 AM"
    },
    status: "CONFIRMED",
    createdAt: "2023-07-17T08:15:00Z"
  },
  {
    id: 4,
    customer: {
      name: "Diana Prince",
      email: "diana@example.com"
    },
    workshop: {
      title: "UX Design"
    },
    timeSlot: {
      startTime: "01:00 PM",
      endTime: "03:00 PM"
    },
    status: "CANCELLED",
    createdAt: "2023-07-18T10:20:00Z"
  }
];

const mockUpcomingWorkshops = [
  {
    id: 1,
    title: "Advanced JavaScript",
    description: "Learn advanced JavaScript concepts and patterns",
    date: "2023-08-15T00:00:00Z",
    maxCapacity: 20,
    timeSlots: [
      {
        id: 1,
        startTime: "10:00 AM",
        endTime: "12:00 PM",
        availableSpots: 5
      },
      {
        id: 2,
        startTime: "02:00 PM",
        endTime: "04:00 PM",
        availableSpots: 8
      }
    ],
    isDeleted: false
  },
  {
    id: 2,
    title: "React Masterclass",
    description: "Deep dive into React hooks and performance optimization",
    date: "2023-08-20T00:00:00Z",
    maxCapacity: 15,
    timeSlots: [
      {
        id: 3,
        startTime: "09:00 AM",
        endTime: "12:00 PM",
        availableSpots: 2
      }
    ],
    isDeleted: false
  },
  {
    id: 3,
    title: "Node.js Fundamentals",
    description: "Build scalable server-side applications with Node.js",
    date: "2023-08-25T00:00:00Z",
    maxCapacity: 12,
    timeSlots: [
      {
        id: 4,
        startTime: "01:00 PM",
        endTime: "04:00 PM",
        availableSpots: 12
      }
    ],
    isDeleted: false
  }
];

const Dashboard = () => {
  const [stats, setStats] = useState(mockStats);
  const [recentBookings, setRecentBookings] = useState(mockRecentBookings);
  const [upcomingWorkshops, setUpcomingWorkshops] = useState(mockUpcomingWorkshops);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const user = {
    name: "Admin User",
    role: "ADMIN",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      // In a real app, you would use axios or fetch here
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    };

    fetchData();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(prev => !prev);
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

  // Generate booking trend data based on mock stats
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Refresh Data">
            <IconButton onClick={handleRefresh} color="primary">
              <RefreshCw size={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton>
              <Bell size={20} color="#4CAF50" />
            </IconButton>
          </Tooltip>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #673AB7' }}
            />
            <Box>
              <Typography fontWeight={500}>{user.name}</Typography>
              <Typography variant="caption" color="text.secondary">{user.role}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {loading ? (
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
                    {stats.popularWorkshop.title}
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
                      {workshopData.map((entry, index) => (
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
                  {recentBookings.map((booking) => (
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
                <Button
                  component={Link}
                  to="/admin/workshops/create"
                  variant="contained"
                  size="small"
                  startIcon={<Plus size={16} />}
                >
                  New Workshop
                </Button>
              </Box>
            </Box>
            <Box sx={{ p: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
              {upcomingWorkshops.map((workshop) => (
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