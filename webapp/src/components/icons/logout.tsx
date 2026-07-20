import { SvgIcon } from "@mui/material";
import type { SvgIconProps } from "@mui/material";

export function Logout(props: Readonly<SvgIconProps>) {
  return (
    <SvgIcon {...props}>
      <svg
        width="20"
        height="18"
        viewBox="0 0 20 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 5L5 9L9 13M5 9L19 9M14 13V14C14 15.6569 12.6569 17 11 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H11C12.6569 1 14 2.34315 14 4V5"
          stroke="#3D3951"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
