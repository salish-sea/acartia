import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Add, Circle, Remove } from "@mui/icons-material";
import { useSearch } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { getMapIconColor } from "@/features/map";

/**
 * Displays a species legend.
 */
export function SpeciesLegendCard() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const query = useSearch({ from: "/" });
  const { data: species = [] } = api.useQuery(
    "get",
    "/sightings",
    { params: { query } },
    { select: (sightings) => new Set(sightings.map((sighting) => sighting.type)) },
  );

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
      <Divider />
      <AccordionDetails sx={{ padding: 0 }}>
        {Array.from(species).length === 0 && (
          <Typography variant="body2" align="center">
            No results
          </Typography>
        )}
        <List dense>
          {Array.from(species).map((s) => (
            <ListItem disableGutters>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <Circle fontSize="small" sx={{ color: getMapIconColor(s) }} />
              </ListItemIcon>
              <ListItemText>{s}</ListItemText>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
