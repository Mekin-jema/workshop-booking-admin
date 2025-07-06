import React, { useState, useEffect } from "react";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  sidebarClasses,
} from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Icons } from "./sidebar/Icon";

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (title: string) => void;
  pathname: string;
}

const Item = ({ title, to, icon, selected, setSelected, pathname }: ItemProps) => {
  const theme = useTheme();
  const isActive = pathname === to;

  return (
    <MenuItem
      icon={icon}
      component={<Link to={to} />}
      onClick={() => setSelected(to)}
      active={isActive}
      style={{
        color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
        backgroundColor: isActive ? theme.palette.action.selected : "transparent",
        margin: "4px 8px",
        borderRadius: "8px",
        transition: "all 0.3s ease",
      }}
    >
      <Typography variant="body2" fontWeight={isActive ? 600 : 400}>
        {title}
      </Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("/admin"); // default path
  const theme = useTheme();
  const location = useLocation();

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  return (
    <Box
      sx={{
        height: "100vh",
        position: "fixed",
        zIndex: theme.zIndex.drawer,
        left: 0,
        top: 0,
        display: "flex",
      }}
    >
      <ProSidebar
        collapsed={isCollapsed}
        width="240px"
        collapsedWidth="80px"
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: theme.palette.background.paper,
            height: "100%",
            borderRight: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[2],
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: theme.palette.action.selected,
                color: theme.palette.primary.main,
              },
              "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.action.hover,
              },
            },
          }}
        >
          {/* Toggle Collapse Button */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              <IconButton
                size="small"
                sx={{
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {isCollapsed ? <Icons.chevronRight /> : <Icons.chevronLeft />}
              </IconButton>
            }
            style={{ margin: "16px 0 24px 0", padding: "0 16px" }}
          >
            {!isCollapsed && (
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ color: theme.palette.primary.main, ml: 1 }}
              >
                WorkshopHub
              </Typography>
            )}
          </MenuItem>


          {/* Navigation Items */}
          <Box sx={{ px: isCollapsed ? 0 : 1 }}>
            <Item title="Dashboard" to="/admin" icon={<Icons.dashboard />} selected={selected} setSelected={setSelected} pathname={location.pathname} />

            {!isCollapsed && (
              <Typography variant="overline" sx={sectionStyle}>
                Workshops
              </Typography>
            )}
            <Item title="All Workshops" to="/admin/workshops" icon={<Icons.workshops />} selected={selected} setSelected={setSelected} pathname={location.pathname} />

            {!isCollapsed && (
              <Typography variant="overline" sx={sectionStyle}>
                Bookings
              </Typography>
            )}
            <Item title="All Bookings" to="/admin/bookings" icon={<Icons.bookings />} selected={selected} setSelected={setSelected} pathname={location.pathname} />

            {!isCollapsed && (
              <Typography variant="overline" sx={sectionStyle}>
                Users
              </Typography>
            )}
            <Item title="All Users" to="/admin/users" icon={<Icons.users />} selected={selected} setSelected={setSelected} pathname={location.pathname} />

            {!isCollapsed && (
              <Typography variant="overline" sx={sectionStyle}>
                Analytics
              </Typography>
            )}
            <Item title="Workshop Analytics" to="/admin/analytics/workshops" icon={<Icons.analytics />} selected={selected} setSelected={setSelected} pathname={location.pathname} />
            <Item title="Booking Analytics" to="/admin/analytics/bookings" icon={<Icons.analytics />} selected={selected} setSelected={setSelected} pathname={location.pathname} />

            {!isCollapsed && (
              <Typography variant="overline" sx={sectionStyle}>
                Settings
              </Typography>
            )}
            <Item title="Profile" to="/admin/profile" icon={<Icons.profile />} selected={selected} setSelected={setSelected} pathname={location.pathname} />
            <Item title="Settings" to="/admin/settings" icon={<Icons.settings />} selected={selected} setSelected={setSelected} pathname={location.pathname} />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

const sectionStyle = {
  display: "block",
  px: 3,
  py: 1,
  color: (theme: any) => theme.palette.text.secondary,
  letterSpacing: "0.5px",
  mt: 1,
};

export default Sidebar;
