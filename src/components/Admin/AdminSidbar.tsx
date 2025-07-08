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
  Stack,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icons } from "./sidebar/Icon";
import type { RootState } from "../../Redux/app/store";
import { logout } from "../../Redux/features/auth/authSlice";
import { LogOut } from "lucide-react";

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (title: string) => void;
  pathname: string;
  isCollapsed: boolean;
}

const Item = ({ title, to, icon, setSelected, pathname, isCollapsed }: ItemProps) => {
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
      {!isCollapsed && (
        <Typography variant="body2" fontWeight={isActive ? 600 : 400}>
          {title}
        </Typography>
      )}
    </MenuItem>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selected, setSelected] = useState("/admin");
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      className="relative"
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
            overflowY: "hidden",
          },
        }}
      >
        <Menu
          menuItemStyles={{
            button: () => ({
              display: "flex",
              justifyContent: isCollapsed ? "center" : "flex-start",
              alignItems: "center",
              flexDirection: isCollapsed ? "column" : "row",
              padding: isCollapsed ? "8px 0" : "8px 16px",
              textAlign: "center",
              [`&.active`]: {
                backgroundColor: theme.palette.action.selected,
                color: theme.palette.primary.main,
              },
              "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.action.hover,
              },
            }),
          }}
        >
          {/* User Profile Header */}
          <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar alt={user?.name} sx={{ width: 40, height: 40 }} />
              {!isCollapsed && (
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {user?.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {user?.role}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>

          {/* Collapse Toggle Button */}
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
            <Item title="Dashboard" to="/admin" icon={<Icons.dashboard />} selected={selected} setSelected={setSelected} pathname={location.pathname} isCollapsed={isCollapsed} />
            <Item title="All Workshops" to="/admin/workshops" icon={<Icons.workshops />} selected={selected} setSelected={setSelected} pathname={location.pathname} isCollapsed={isCollapsed} />
            <Item title="All Bookings" to="/admin/bookings" icon={<Icons.bookings />} selected={selected} setSelected={setSelected} pathname={location.pathname} isCollapsed={isCollapsed} />
            <Item title="All Users" to="/admin/users" icon={<Icons.users />} selected={selected} setSelected={setSelected} pathname={location.pathname} isCollapsed={isCollapsed} />
            <Item title="Workshop Analytics" to="/admin/analytics/workshops" icon={<Icons.analytics />} selected={selected} setSelected={setSelected} pathname={location.pathname} isCollapsed={isCollapsed} />
            <Item title="Booking Analytics" to="/admin/analytics/bookings" icon={<Icons.analytics />} selected={selected} setSelected={setSelected} pathname={location.pathname} isCollapsed={isCollapsed} />
          </Box>

          {/* Logout Button */}
          <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }} className="absolute bottom-0 w-full justify-center items-center">
            <Button
              fullWidth
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
              sx={{
                justifyContent: isCollapsed ? "center" : "flex-start",
                minWidth: "auto",
                color: theme.palette.text.secondary,
                "&:hover": {
                  color: theme.palette.error.main,
                  backgroundColor: "transparent",
                },
              }}
            >
              {isCollapsed ? (
                <LogOut />
              ) : (
                <>
                  <LogOut />
                  <Typography variant="body2" ml={1}>Logout</Typography>
                </>
              )}
            </Button>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
