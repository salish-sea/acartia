import { ArrowForwardRounded } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import type { ReactElement } from "react";

type Props = { title: string; description: string; icon: ReactElement; onClick: () => void };

/**
 * A little card that shows a header and some text and links to something. Not exactly sure what this is.
 */
export function TileButton({ title, description, icon, onClick }: Readonly<Props>) {
  return (
    <Card
      sx={{
        width: "327px",
        minHeight: "127px",
        backgroundColor: "primary.lighter",
        borderRadius: "12px",
        padding: 0,
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardContent sx={{ px: 2, py: 3, display: "flex", flexDirection: "column", gap: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
            {icon}
            <Typography variant="h3" sx={{ color: "text.tertiary", flexGrow: 1, flexShrink: 0 }}>
              {title}
            </Typography>
            <ArrowForwardRounded sx={{ color: "text.tertiary" }} />
          </Stack>
          <Typography variant="body1" sx={{ color: "text.tertiary" }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
