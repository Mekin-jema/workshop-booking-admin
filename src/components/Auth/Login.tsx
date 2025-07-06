import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Divider,
  InputAdornment,
} from "@mui/material";
import Grid from '@mui/material/Grid';

import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
// import { useUserStore } from "@/store/useUserStore";
import { loginSchema } from "../../lib/schema/loginSchema";

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

const Login: React.FC = () => {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  // const { login } = useUserStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setPending(true);
      // await login(data);
      reset();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", boxShadow: 4 }}>
        <CardHeader
          title="Welcome back"
          subheader="Enter your credentials to access your account"
          titleTypographyProps={{ align: "center", fontWeight: "bold", fontSize: 22 }}
          subheaderTypographyProps={{ align: "center" }}
        />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              {/* Email Field */}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Mail size={20} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              {/* Password Field */}
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock size={20} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              {/* Remember Me Checkbox */}
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value ?? false}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Remember me"
                  />
                )}
              />

              {/* Forgot Password Link */}
              <Link to="/forgot-password" style={{ fontSize: 14 }}>
                Forgot password?
              </Link>

              {/* Submit Button */}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={pending}
                startIcon={pending ? <Loader2 className="animate-spin" size={18} /> : null}
                endIcon={!pending ? <ArrowRight size={18} /> : null}
              >
                {pending ? "Please wait..." : "Log in"}
              </Button>
            </Grid>
          </form>
        </CardContent>

        <Divider sx={{ my: 1 }} />

        <CardContent>


          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don&apos;t have an account?{" "}
            <Link to="/signup" style={{ fontWeight: "bold" }}>
              Sign up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
