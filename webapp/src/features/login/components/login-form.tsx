import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Alert, Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import type { SyntheticEvent } from "react";
import { Link } from "@/components/link";
import { PasswordField } from "@/components/password-field";
import { api } from "@/lib/api";

/**
 * The form for logging in.
 */
export function LoginForm() {
  const { mutate: login, error, isPending, isError } = api.useMutation("post", "/auth/login");
  const navigate = useNavigate({ from: "/login" });
  const queryClient = useQueryClient();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const canSubmit = username.trim() !== "" && password.trim() !== "";

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    login(
      { body: { username, password } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["get", "/user"] });
          navigate({ to: "/" });
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={4} sx={{ mt: "150px", mx: 2, width: 330 }}>
        <Typography variant="h2" align="center">
          Welcome back!
        </Typography>
        <Stack width="100%" gap={4}>
          {isError && (
            <Alert variant="filled" severity="error">
              {error.message}
            </Alert>
          )}
          <FormControl>
            <TextField
              size="small"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Email"
              fullWidth
              error={isError}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </FormControl>
          <FormControl>
            <PasswordField
              size="small"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={isError}
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
