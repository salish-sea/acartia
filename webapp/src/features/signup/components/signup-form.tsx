import { useState } from "react";
import { Button, FormControl, Stack, TextField, Typography } from "@mui/material";
import { Link } from "@/components/link";
import { PasswordField } from "@/components/password-field";

const defaultValues = { name: "", email: "", password: "", passwordConfirm: "" };

/**
 * The form for signing up / registering.
 */
export function SignupForm() {
  const [data, setData] = useState<typeof defaultValues>(defaultValues);
  const canSubmit = !Object.values(data).some((v) => v === "");

  return (
    <form>
      <Stack gap={4} sx={{ mt: "150px", mx: 2 }}>
        <Typography variant="h2" align="center">
          Register
        </Typography>
        <Stack width="100%" gap={4}>
          <FormControl>
            <TextField
              size="small"
              value={data.name}
              onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
              label="Your Name"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </FormControl>
          <FormControl>
            <TextField
              size="small"
              value={data.email}
              onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
              label="Email"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </FormControl>
          <FormControl>
            <PasswordField
              size="small"
              label="Password"
              value={data.password}
              onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
              fullWidth
            />
          </FormControl>
          <FormControl>
            <PasswordField
              size="small"
              label="Confirm Password"
              value={data.passwordConfirm}
              onChange={(e) => setData((prev) => ({ ...prev, passwordConfirm: e.target.value }))}
              fullWidth
            />
          </FormControl>
        </Stack>
        <Stack gap={1.5}>
          <Button variant="contained" type="submit" disabled={!canSubmit}>
            Sign up
          </Button>
          <Typography align="center">
            Already have an account?{" "}
            <Link to="/login" sx={{ ml: 1 }}>
              Log in
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </form>
  );
}
