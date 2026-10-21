import { SvgIcon } from "@mui/material";
import type { SvgIconProps } from "@mui/material";

export function Github(props: Readonly<SvgIconProps>) {
  return (
    <SvgIcon {...props}>
      <svg
        width="19"
        height="20"
        viewBox="0 0 19 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 16.9223C2.7 18.3223 2.7 14.4223 1 13.9223M13 18.9223V15.4223C13 14.4223 13.1 14.0223 12.5 13.4223C15.3 13.1223 18 12.0223 18 7.42231C17.9988 6.22728 17.5325 5.07962 16.7 4.22231C17.0905 3.18428 17.0545 2.03394 16.6 1.02231C16.6 1.02231 15.5 0.722314 13.1 2.32231C11.0672 1.7929 8.93276 1.7929 6.9 2.32231C4.5 0.722314 3.4 1.02231 3.4 1.02231C2.94548 2.03394 2.90953 3.18428 3.3 4.22231C2.46745 5.07962 2.00122 6.22728 2 7.42231C2 12.0223 4.7 13.1223 7.5 13.4223C6.9 14.0223 6.9 14.6223 7 15.4223V18.9223"
          stroke="#545F71"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </SvgIcon>
  );
}
