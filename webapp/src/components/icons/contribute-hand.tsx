import { SvgIcon } from "@mui/material";
import type { SvgIconProps } from "@mui/material";

export function ContributeHand(props: Readonly<SvgIconProps>) {
  return (
    <SvgIcon {...props}>
      <svg
        width="17"
        height="20"
        viewBox="0 0 17 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 9.5V12M4 9.5V3.5C4 2.67157 4.67157 2 5.5 2C6.32843 2 7 2.67157 7 3.5M4 9.5C4 8.67157 3.32843 8 2.5 8C1.67157 8 1 8.67157 1 9.5V11.5C1 15.6421 4.35786 19 8.5 19C12.6421 19 16 15.6421 16 11.5V6.5C16 5.67157 15.3284 5 14.5 5C13.6716 5 13 5.67157 13 6.5M7 3.5V9M7 3.5V2.5C7 1.67157 7.67157 1 8.5 1C9.32843 1 10 1.67157 10 2.5V3.5M10 3.5V9M10 3.5C10 2.67157 10.6716 2 11.5 2C12.3284 2 13 2.67157 13 3.5V6.5M13 6.5V9"
          stroke="#545F71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
