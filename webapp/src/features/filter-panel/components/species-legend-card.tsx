import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

/**
 * Displays a species legend.
 */
export function SpeciesLegendCard() {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      disableGutters
      sx={{
        paddingX: "36px",
        paddingY: "24px",
        backgroundColor: "transparent",
        ":before": { backgroundColor: "transparent" },
      }}
    >
      <AccordionSummary expandIcon={expanded ? <Remove /> : <Add />} sx={{ padding: 0 }}>
        <Typography variant="h3">Species Legend</Typography>
      </AccordionSummary>
      <AccordionDetails>TODO</AccordionDetails>
    </Accordion>
  );
}
