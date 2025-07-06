import { Box, Typography, Button } from "@mui/material";
import { Rocket, Mail, Calendar } from "lucide-react";

const Settings = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 3,
        background: "#f8f9fa",
      }}
    >
      <Rocket size={80} color="#3f51b5" strokeWidth={1.5} />

      <Typography variant="h3" sx={{ mt: 3, mb: 2, fontWeight: 700 }}>
        Coming Soon
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, maxWidth: 500 }}>
        We're working on something exciting! Stay tuned for our launch.
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
        <Calendar size={20} color="#757575" />
        <Typography color="text.secondary">
          Launching January 2024
        </Typography>
      </Box>

      <Button
        variant="contained"
        size="large"
        startIcon={<Mail size={20} />}
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: 2,
          fontWeight: 600,
        }}
      >
        Notify Me
      </Button>
    </Box>
  );
};

export default Settings;