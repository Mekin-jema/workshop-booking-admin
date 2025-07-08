// src/layouts/AdminLayout.tsx
import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Admin/AdminSidbar";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    transition: "margin-left 0.3s ease",
                    marginLeft: isCollapsed ? "70px" : "240px", // Responsive to sidebar state
                    minHeight: "100vh",
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminLayout;
