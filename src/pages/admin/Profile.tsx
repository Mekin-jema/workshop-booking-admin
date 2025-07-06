import React from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import { Save } from "lucide-react";

const Profile: React.FC = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    avatar: "/path/to/avatar.jpg",
    bio: "WorkshopHub administrator with full access to all features.",
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        My Profile
      </Typography>

      {/* Outer Grid container */}
      <Grid container justifyContent="center" sx={{ backgroundColor: "#000" }}>
        <Container maxWidth="sm" sx={{ backgroundColor: "#fff", py: 3, borderRadius: 2 }}>
          {/* Inner Grid container for profile content */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
              <Avatar
                src={user.avatar}
                alt={user.name}
                sx={{
                  width: 120,
                  height: 120,
                  mx: "auto",
                  mb: 2,
                }}
              />
              <Button variant="outlined" color="primary">
                Change Photo
              </Button>
              <Typography variant="h6" sx={{ mt: 2 }}>
                {user.name}
              </Typography>
              <Typography color="text.secondary">{user.role}</Typography>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    defaultValue={user.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    defaultValue={user.email}
                    variant="outlined"
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    defaultValue={user.bio}
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    variant="outlined"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    variant="outlined"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Save size={20} />}
                    fullWidth
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Box>
  );
};

export default Profile;
