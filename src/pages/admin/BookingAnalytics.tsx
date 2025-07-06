import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const BookingAnalytics: React.FC = () => {
  const monthlyData = [
    { name: "Jan", bookings: 12, revenue: 1200 },
    { name: "Feb", bookings: 19, revenue: 1900 },
    { name: "Mar", bookings: 15, revenue: 1500 },
    { name: "Apr", bookings: 28, revenue: 2800 },
    { name: "May", bookings: 32, revenue: 3200 },
    { name: "Jun", bookings: 24, revenue: 2400 },
  ];

  const statusData = [
    { name: "Confirmed", value: 65 },
    { name: "Pending", value: 15 },
    { name: "Cancelled", value: 20 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Booking Analytics
      </Typography>

      <Grid container spacing={3}>
        <Paper elevation={3} sx={{ p: 2, height: 400 }}>
          <Typography variant="h6" gutterBottom>
            Monthly Bookings & Revenue
          </Typography>
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="bookings"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>

        <Paper elevation={3} sx={{ p: 2, height: 400 }}>
          <Typography variant="h6" gutterBottom>
            Booking Status
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {statusData.map((item) => (
              <Box key={item.name}>
                <Typography>{item.name}: {item.value}%</Typography>
                <Box sx={{ height: 10, bgcolor: 'divider', borderRadius: 5 }}>
                  <Box
                    sx={{
                      height: '100%',
                      bgcolor: item.name === 'Confirmed' ? 'success.main' :
                        item.name === 'Pending' ? 'warning.main' : 'error.main',
                      width: `${item.value}%`,
                      borderRadius: 5
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>


    </Box>
  );
};

export default BookingAnalytics;
