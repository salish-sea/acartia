import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Alert, Button, FormControl, FormLabel, Stack, TextField, Typography } from "@mui/material";
import type { SyntheticEvent } from "react";
import type { User } from "@/types/api";
import { api } from "@/lib/api";
import { useToasts } from "@/hooks/use-toasts";

type FormValues = Pick<User, "name" | "email"> & { website: NonNullable<User["website"]> };

/**
 * Returns true when the form is dirty given default and actual values.
 *
 * @param formValues The current state of the form.
 * @param defaultValues The default form values.
 * @returns Whether the form is dirty.
 */
function isDirty(formValues: FormValues, defaultValues: FormValues): boolean {
  return (Object.keys(formValues) as Array<keyof FormValues>).some(
    (k) => !Object.is(formValues[k], defaultValues[k]),
  );
}

type Props = {
  /**
   * The default values for the account-settings form.
   */
  defaultValues: FormValues;
};

/**
 * Form that allows a logged-in user to update their basic details.
 */
export function AccountSettingsForm({ defaultValues }: Readonly<Props>) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: updateProfile, error, isPending, isError } = api.useMutation("put", "/profile");
  const enqueueToast = useToasts();
  const [formValues, setFormValues] = useState<FormValues>(defaultValues);
  const [validationErrors, setValidationErrors] = useState<Array<string>>([]);
  const canSubmit = isDirty(formValues, defaultValues);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!formValues.email.includes("@")) {
      setValidationErrors(["Please enter a valid email"]);
    } else {
      setValidationErrors([]);
      updateProfile(
        { body: formValues },
        {
          onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["get", "/profile"] });
            router.invalidate();
            enqueueToast({ message: "Successfully updated details", severity: "success" });
          },
        },
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {(isError || validationErrors.length > 0) && (
        <Stack alignItems="center" gap={1} sx={{ width: "100%", mt: "100px" }}>
          {validationErrors.map((e) => (
            <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
              {e}
            </Alert>
          ))}
          {isError && (
            <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
              {error.message}
            </Alert>
          )}
        </Stack>
      )}
      <Stack gap={2} alignItems="center" sx={{ mt: "150px", width: 327 }}>
        <Typography variant="h2">Account Settings</Typography>
        <FormControl fullWidth>
          <FormLabel>Name</FormLabel>
          <TextField
            size="small"
            value={formValues.name}
            onChange={(e) => setFormValues((prev) => ({ ...prev, name: e.target.value }))}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Website</FormLabel>
          <TextField
            size="small"
            value={formValues.website}
            onChange={(e) => setFormValues((prev) => ({ ...prev, website: e.target.value }))}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Email</FormLabel>
          <TextField
            size="small"
            value={formValues.email}
            onChange={(e) => setFormValues((prev) => ({ ...prev, email: e.target.value }))}
            // email is the only field we are validating
            error={validationErrors.length > 0}
          />
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          loading={isPending}
          disabled={!canSubmit}
          fullWidth
          sx={{ mt: 5 }}
        >
          Save Changes
        </Button>
      </Stack>
    </form>
  );
}
