import { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import type { TextFieldProps } from "@mui/material";

type Props = Omit<TextFieldProps, "slotProps" | "type">;

/**
 * A Mui TextField with a show/hide password adornment button.
 */
export function PasswordField(props: Props) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <TextField
      {...props}
      type={show ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShow((prev) => !prev)}
                onMouseDown={(e) => e.preventDefault()}
                onMouseUp={(e) => e.preventDefault()}
                edge="end"
              >
                {show ? (
                  <VisibilityOffOutlined sx={{ color: "text.primary" }} />
                ) : (
                  <VisibilityOutlined sx={{ color: "text.primary" }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
        inputLabel: { shrink: true },
      }}
    />
  );
}
