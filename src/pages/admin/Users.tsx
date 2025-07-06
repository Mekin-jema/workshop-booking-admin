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
  Avatar,
  Chip,
  Button,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import {
  Edit,
  Delete,
  Search,
  FilterList,
  PersonAdd,
  Refresh,
  Close,
  Save
} from "@mui/icons-material";

const Users: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "instructor",
      status: "active",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "student",
      status: "inactive",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
  ];

  const handleOpenEditDialog = (user: any) => {
    setCurrentUser(user);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setCurrentUser(null);
  };

  const handleSaveUser = () => {
    // Here you would typically make an API call to save the changes
    console.log("Saving user:", currentUser);
    handleCloseEditDialog();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUser((prev: typeof currentUser) => ({ ...prev, [name]: value }));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          User Management
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search users..."
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Tooltip title="Filter">
            <IconButton>
              <FilterList />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAdd />}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Add User
          </Button>
        </Box>
      </Box>

      <Paper elevation={0} sx={{
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider'
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'action.hover' }}>
                <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={user.avatar} alt={user.name} />
                      <Typography fontWeight={500}>{user.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={
                        user.role === 'admin' ? 'primary' :
                          user.role === 'instructor' ? 'secondary' : 'default'
                      }
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={user.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenEditDialog(user)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error">
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Edit User</Typography>
            <IconButton onClick={handleCloseEditDialog}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {currentUser && (
            <Box sx={{ pt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Avatar
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  sx={{ width: 80, height: 80 }}
                />
              </Box>

              <TextField
                label="Full Name"
                name="name"
                value={currentUser.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Email"
                name="email"
                type="email"
                value={currentUser.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />

              <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={currentUser.role}
                  label="Role"
                  onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="instructor">Instructor</MenuItem>
                  <MenuItem value="student">Student</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={currentUser.status}
                  label="Status"
                  onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value })}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={handleCloseEditDialog}
            variant="outlined"
            startIcon={<Close />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveUser}
            variant="contained"
            color="primary"
            startIcon={<Save />}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;