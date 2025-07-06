import React from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Chip } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const Users: React.FC = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin", status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "instructor", status: "active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "student", status: "inactive" },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">All Users</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
          Add User
        </Button>
      </Box>

      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2 }} />
                      {user.name}
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
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={user.status === 'active' ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" color="primary">Edit</Button>
                    <Button size="small" color="secondary">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Users;
