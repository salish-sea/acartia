import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Alert,
  Button,
  FormControl,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { SyntheticEvent } from "react";
import { Link } from "@/components/link";
import { PasswordField } from "@/components/password-field";
import { api } from "@/lib/api";

const defaultValues = { name: "", email: "", password: "", passwordConfirm: "" };

type FormValues = typeof defaultValues;

/**
 * Very minimal validation on email and password. Might extend later.
 *
 * @param formValues The values of the sign-up form including email & password. {@link FormValues}
 * @returns An array containing validation errors given the form values.
 */
function validateFormValues({ email, password, passwordConfirm }: FormValues): Array<string> {
  const passwordsMatch: boolean = password === passwordConfirm;
  const passwordTooShort: boolean = passwordsMatch && password.length < 12;
  const badEmail = !email.includes("@");

  return [
    ...(!passwordsMatch ? ["Passwords must match"] : []),
    ...(passwordsMatch && passwordTooShort ? ["Password must be at least 12 characters long"] : []),
    ...(badEmail ? ["Please enter a valid email"] : []),
  ];
}

/**
 * The form for signing up / registering.
 */
export function SignupForm() {
  const { mutate: register, error, isPending, isError } = api.useMutation("post", "/auth/register");
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>(defaultValues);
  const [validationErrors, setValidationErrors] = useState<Array<string>>([]);
  const canSubmit = !Object.values(formValues).some((v) => v === "");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const errors = validateFormValues(formValues);
    setValidationErrors(errors);

    if (errors.length === 0) {
      register({ body: formValues }, { onSuccess: () => navigate({ to: "/login" }) });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={4} sx={{ mt: "150px", width: 330, mx: 2 }}>
        <Typography variant="h2" align="center">
          Register
        </Typography>

        <Stack width="100%" gap={4}>
          <Stack gap={1}>
            {isError && (
              <Alert variant="filled" severity="error">
                {error.message}
              </Alert>
            )}
            {validationErrors.length > 0 && (
              <Alert variant="filled" severity="error">
                <List dense disablePadding sx={{ listStyleType: "disc", pl: 2 }}>
                  {validationErrors.map((e) => (
                    <ListItem
                      key={e}
                      dense
                      disablePadding
                      sx={{ display: "list-item", "&::marker": { fontSize: "0.6rem" } }}
                    >
                      <ListItemText sx={{ pl: 1 }} slotProps={{ primary: { color: "error.main" } }}>
                        {e}
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Alert>
            )}
          </Stack>
          <FormControl>
            <TextField
              size="small"
              value={formValues.name}
              onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))}
              label="Your Name"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </FormControl>
          <FormControl>
            <TextField
              size="small"
              value={formValues.email}
              onChange={(e) => setFormValues((prev) => ({ ...prev, email: e.target.value }))}
              label="Email"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </FormControl>
          <FormControl>
            <PasswordField
              size="small"
              label="Password"
              value={formValues.password}
              onChange={(e) => setFormValues((prev) => ({ ...prev, password: e.target.value }))}
              fullWidth
            />
          </FormControl>
          <FormControl>
            <PasswordField
              size="small"
              label="Confirm Password"
              value={formValues.passwordConfirm}
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, passwordConfirm: e.target.value }))
              }
              fullWidth
            />
          </FormControl>
        </Stack>
        <Stack gap={1.5}>
          <Button variant="contained" type="submit" loading={isPending} disabled={!canSubmit}>
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
