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
      icon={<Box sx={{ fontSize: 18 }}>{icon}</Box>}
      component={<Link to={to} />}
      onClick={() => setSelected(to)}
      active={isActive}
      style={{
        color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
        backgroundColor: isActive ? theme.palette.action.selected : "transparent",
        margin: "2px 4px",
        borderRadius: "6px",
        transition: "all 0.3s ease",
        padding: "4px 8px",
      }}
    >
      {!isCollapsed && (
        <Typography variant="caption" fontWeight={isActive ? 600 : 400} noWrap>
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
              padding: isCollapsed ? "6px 0" : "6px 12px",
              gap: isCollapsed ? "0px" : "8px",
              fontSize: "0.75rem",
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
          {/* User Profile */}
          <Box sx={{ p: 1.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar alt={user?.name} sx={{ width: 32, height: 32 }} />
              {!isCollapsed && (
                <Box>
                  <Typography variant="body2" fontWeight={600} noWrap>
                    {user?.name}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" noWrap>
                    {user?.role}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>

          {/* Collapse Toggle */}
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
            style={{ margin: "12px 0 16px 0", padding: "0 8px" }}
          >
            {!isCollapsed && (
              <Typography
                variant="subtitle2"
                fontWeight={700}
                sx={{ color: theme.palette.primary.main, ml: 1 }}
              >
                WorkshopHub
              </Typography>
            )}
          </MenuItem>

          {/* Menu Items */}
          <Box sx={{ px: isCollapsed ? 0 : 1 }}>
            <Item title="Dashboard" to="/admin" icon={<Icons.dashboard />} selected={selected} setSelected={setSelected} pathname={location.pathname} isCollapsed={isCollapsed} />
            <Item title="All Workshops" to="/admin/workshops" icon={<Icons.workshops />} selected={selected} setSelected={setSelected} pathname={location.pathname} isCollapsed={isCollapsed} />
            <Item title="All Bookings" to="/admin/bookings" icon={<Icons.bookings />} selected={selected} setSelected={setSelected} pathname={location.pathname} isCollapsed={isCollapsed} />
            <Item title="All Users" to="/admin/users" icon={<Icons.users />} selected={selected} setSelected={setSelected} pathname={location.pathname} isCollapsed={isCollapsed} />
            <Item title="Workshop Analytics" to="/admin/analytics/workshops" icon={<Icons.analytics />} selected={selected} setSelected={setSelected} pathname={location.pathname} isCollapsed={isCollapsed} />
            <Item title="Booking Analytics" to="/admin/analytics/bookings" icon={<Icons.analytics />} selected={selected} setSelected={setSelected} pathname={location.pathname} isCollapsed={isCollapsed} />
          </Box>

          {/* Logout */}
          <Box
            sx={{
              p: 1.5,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
            className="absolute bottom-0 w-full justify-center items-center"
          >
            <Button
              fullWidth
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
              sx={{
                justifyContent: isCollapsed ? "center" : "flex-start",
                minWidth: "auto",
                fontSize: "0.75rem",
                color: theme.palette.text.secondary,
                "&:hover": {
                  color: theme.palette.error.main,
                  backgroundColor: "transparent",
                },
              }}
            >
              {isCollapsed ? (
                <LogOut size={18} />
              ) : (
                <>
                  <LogOut size={18} />
                  <Typography variant="caption" ml={1}>
                    Logout
                  </Typography>
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
