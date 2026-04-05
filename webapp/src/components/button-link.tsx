import { forwardRef } from "react";
import { createLink } from "@tanstack/react-router";
import { Button } from "@mui/material";
import type { LinkComponent } from "@tanstack/react-router";
import type { ButtonProps } from "@mui/material";

interface MUIButtonLinkProps extends ButtonProps<"a"> {}

const MUIButtonLinkComponent = forwardRef<HTMLAnchorElement, MUIButtonLinkProps>((props, ref) => (
  <Button ref={ref} component="a" {...props} />
));

const CreatedButtonLinkComponent = createLink(MUIButtonLinkComponent);

export const ButtonLink: LinkComponent<typeof MUIButtonLinkComponent> = (props) => {
  return <CreatedButtonLinkComponent preload={"intent"} {...props} />;
};
