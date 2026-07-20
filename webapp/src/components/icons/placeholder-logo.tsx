import { SvgIcon } from "@mui/material";
import type { SvgIconProps } from "@mui/material";

export function PlaceholderLogo(props: Readonly<SvgIconProps>) {
  return (
    <SvgIcon {...props}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 25L10.1716 15.8284C11.7337 14.2663 14.2663 14.2663 15.8284 15.8284L25 25M21 21L24.1716 17.8284C25.7337 16.2663 28.2663 16.2663 29.8284 17.8284L33 21M21 9H21.02M5 33H29C31.2091 33 33 31.2091 33 29V5C33 2.79086 31.2091 1 29 1H5C2.79086 1 1 2.79086 1 5V29C1 31.2091 2.79086 33 5 33Z"
          stroke="#00585D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
