import { createTheme } from "@mui/material";
import type { PaletteColorOptions, Theme } from "@mui/material";

declare module "@mui/material/styles" {
  interface PaletteColor {
    lightest?: string;
    lighter?: string;
    darker?: string;
    darkest?: string;
  }

  interface SimplePaletteColorOptions {
    lightest?: string;
    lighter?: string;
    darker?: string;
    darkest?: string;
  }

  interface Palette {
    neutral?: PaletteColorOptions;
  }

  interface PaletteOptions {
    neutral?: PaletteColorOptions;
  }

  interface TypeText {
    contrast: string;
  }

  /**
   * In order to do global theme overrides for the Mui-x components, module augmentation
   * is necessary. The correct util types don't appear to be exposed by Mui in this version
   * of the libary so instead we have Record<string, object>. If you are reading this and
   * know of a better solution that would be appreciated.
   */
  interface Components {
    MuiPickersTextField: {
      styleOverrides: {
        root: ({ theme }: { theme: Theme }) => Record<string, object>;
      };
    };
  }
}

export const appTheme = createTheme({
  palette: {
    primary: {
      lightest: "#F0FBFB",
      lighter: "#E6F7F9",
      light: "#BFEBED",
      main: "#80D7DD",
      dark: "#40C3CB",
      darker: "#00AFBA",
      darkest: "#007B83",
    },
    text: {
      primary: "#3D3951",
      secondary: "#6D6B7D",
      contrast: "#00585D",
    },
    success: {
      main: "#2CC396",
      dark: "#239C78",
    },
    error: {
      main: "#B22A2A",
      light: "#F9CDCD",
    },
  },
  typography: {
    h1: {
      fontFamily: "Mukta",
      fontSize: "48px",
      fontWeight: "700",
      lineHeight: "48px",
    },
    h2: {
      fontFamily: "Mukta",
      fontSize: "32px",
      fontWeight: "600",
      lineHeight: "36px",
    },
    h3: {
      fontFamily: "Mukta",
      fontSize: "24px",
      fontWeight: "500",
      lineHeight: "30px",
    },
    body1: {
      fontFamily: "Montserrat",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "22px",
    },
    body2: {
      fontFamily: "Inter",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "19px",
    },
    button: {
      fontSize: "16px",
      fontFamily: "Montserrat",
      fontWeight: "500",
    },
  },
  components: {
    MuiAlert: {
      defaultProps: {
        icon: false,
        // "standard" or whatever is weird.
        variant: "filled",
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 400,
        },
        filledError: ({ theme }) => ({
          color: theme.palette.error.main,
          backgroundColor: theme.palette.error.light,
        }),
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          // TODO this doesn't work
          "& label[data-shrink=false] + .MuiInputBase-input::placeholder": {
            opacity: "0.5 !important",
          },
          formControl: {
            "label[data-shrink=false].MuiFormLabel-root ~ & ::-webkit-input-placeholder": {
              opacity: "0.5!important",
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          "&.Mui-focused": {
            color: theme.palette.text.primary,
          },
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.primary,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderWidth: "2px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.primary,
          },
        }),
      },
    },
    MuiPickersTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiPickersOutlinedInput-notchedOutline": {
            borderColor: theme.palette.text.primary,
          },
          // TODO these don't work, might have to do default props
          // "&:hover .MuiOutlinedInput-notchedOutline": {
          //   borderWidth: "2px",
          // },
          // "&.Mui-focused .MuiPickersOutlinedInput-notchedOutline": {
          //   borderColor: theme.palette.text.primary,
          // },
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          variants: [
            {
              props: { variant: "outlined" },
              style: ({ theme }) => ({
                color: theme.palette.primary.darkest,
                borderColor: theme.palette.primary.darkest,
              }),
            },
            {
              props: { variant: "contained" },
              style: ({ theme }) => ({
                backgroundColor: theme.palette.primary.darker,
                "&.Mui-disabled:not(.MuiButton-loading)": {
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.text.secondary,
                },
              }),
            },
            {
              props: { variant: "text" },
              style: ({ theme }) => ({
                color: theme.palette.primary.darkest,
              }),
            },
          ],
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.darkest,
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.contrast,
        }),
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.contrast,
        }),
      },
    },
  },
});
