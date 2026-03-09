import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import type { SyntheticEvent } from "react";
import { Link } from "@/components/link";
import { PasswordField } from "@/components/password-field";
import { api } from "@/lib/api/api";
import { useAuth } from "@/hooks/use-auth-store";

/**
 * The form for logging in.
 */
export function LoginForm() {
  const { mutate, isPending } = api.useMutation("post", "/auth", {
    onSuccess: ({ token, user }) => login({ token, user }),
  });
  const navigate = useNavigate({ from: "/login" });
  const { login } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const canSubmit = username.trim() !== "" && password.trim() !== "";

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    mutate(
      {
        headers: { Authorization: `Basic ${btoa(`${username}:${password}`)}` },
        body: { access_token: import.meta.env.VITE_APP_MASTER_KEY },
      },
      { onSuccess: () => navigate({ to: "/" }) },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={4} sx={{ mt: "150px", mx: 2 }}>
        <Typography variant="h2" align="center">
          Welcome back!
        </Typography>
        <Stack width="100%" gap={4}>
          <FormControl>
            <TextField
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Email"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </FormControl>
          <FormControl>
            <PasswordField
              size="small"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </FormControl>
          {/* TODO - make forgot-password page */}
          <Link
            to="/signup"
            variant="body1"
            align="right"
            underline="hover"
            sx={{ display: "block", mt: -3 }}
          >
            Forgot password?
          </Link>
        </Stack>
        <Stack gap={1.5}>
          <Button variant="contained" type="submit" loading={isPending} disabled={!canSubmit}>
            Log in
          </Button>
          <Typography align="center">
            Don't have an account?{" "}
            <Link to="/signup" sx={{ ml: 1 }}>
              Sign up
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </form>
  );
}
