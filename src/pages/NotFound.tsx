import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { HomeIcon } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "6rem", fontWeight: 700, mb: 2 }}>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Oops! Page not found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<HomeIcon />}
          component={Link}
          to="/"
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
