import { useState } from "react";
import { Button, FormControl, FormLabel, Stack, Typography } from "@mui/material";
import type { SyntheticEvent } from "react";
import { PasswordField } from "@/components/password-field";

type FormValues = { password: string };

/**
 * Form that allows a logged-in user to delete their account.
 */
export function DeleteAccountForm() {
  const [formValues, setFormValues] = useState<FormValues>({ password: "" });
  const canSubmit = formValues.password !== "";

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={8} alignItems="center" sx={{ mt: "150px" }}>
        <Stack alignItems="center" gap={3} sx={{ width: "660px" }}>
          <Typography variant="h2">Delete your account?</Typography>
          <Typography variant="body1" fontFamily="Inter">
            You will lose all your data by deleting your account, and your contributions will be
            removed. This action cannot be undone
            <br />
            <br />
            To delete your account, input your password below.
          </Typography>
        </Stack>
        <Stack gap={2} sx={{ width: 327 }}>
          <FormControl fullWidth>
            <FormLabel>Password</FormLabel>
            <PasswordField
              size="small"
              value={formValues.password}
              onChange={(e) => setFormValues((prev) => ({ ...prev, password: e.target.value }))}
            />
          </FormControl>
          <Button variant="contained" type="submit" disabled={!canSubmit} fullWidth sx={{ mt: 2 }}>
            Delete Account
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
