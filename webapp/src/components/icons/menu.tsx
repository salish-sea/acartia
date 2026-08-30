import { SvgIcon } from "@mui/material";
import type { SvgIconProps } from "@mui/material";

export function Menu(props: Readonly<SvgIconProps>) {
  return (
    <SvgIcon {...props}>
      <svg
        width="34"
        height="26"
        viewBox="0 0 34 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1H33M1 13H33M1 25H33"
          stroke="#00585D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
