// src/pages/admin/Dashboard.tsx
import React from "react";
import { Typography } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to the WorkshopHub admin dashboard
      </Typography>
    </div>
  );
};

export default Dashboard;