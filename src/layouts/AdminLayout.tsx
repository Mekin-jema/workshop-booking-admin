// src/layouts/AdminLayout.tsx
import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Admin/AdminSidbar";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    marginLeft: "240px", // Match sidebar width
                    minHeight: "100vh",
                    backgroundColor: (theme) => theme.palette.background.default,
                }}
            >
                <Outlet /> {/* 🟢 Route content will be injected here */}
            </Box>
        </Box>
    );
};

export default AdminLayout;
