import { useState } from "react";
import { Box, Button, Divider, Typography, styled, useTheme } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Popup } from "react-leaflet";
import dayjs from "dayjs";
import type { Sighting } from "@/types/api";

const Poopup = styled(Popup)(({ theme }) => ({
  "& .leaflet-popup-content-wrapper": {
    backgroundColor: "#F2F2FF",
    minWidth: "236px",
  },
  "& .leaflet-popup-content": {
    margin: 0,
  },
  "& .leaflet-popup-tip": {
    backgroundColor: theme.palette.secondary.lighter,
  },
  "& a.leaflet-popup-close-button": {
    fontSize: 30,
    color: theme.palette.text.primary,
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const NoMarginTypography = styled(Typography)(({ theme }) => ({
  marginTop: `${theme.spacing(1)} !important`,
  marginBottom: `${theme.spacing(1)} !important`,
}));

type Props = {
  /**
   * The sighting to display.
   */
  sighting: Sighting;
};

/**
 * The card inside the popup when you click on a sighting marker on the map.
 */
export function SightingDetailsPopup({ sighting }: Readonly<Props>) {
  const theme = useTheme();
  const created = dayjs(sighting.created);
  const [expanded, setExpanded] = useState(false);

  return (
    <Poopup>
      <Box sx={{ padding: 2 }}>
        <NoMarginTypography variant="body2">
          <b>Date: </b>
          {created.date()}
        </NoMarginTypography>
        <Divider />
        <NoMarginTypography variant="body2">
          <b>Species: </b>
          {sighting.type}
        </NoMarginTypography>
        <Divider />
        <NoMarginTypography variant="body2">
          <b># Sighted: </b>
          {sighting.no_sighted}
        </NoMarginTypography>
        {expanded && (
          <>
            <Divider />
            <NoMarginTypography variant="body2">
              <b>Submitter: </b>
              {sighting.data_source_entity}
            </NoMarginTypography>
            <Divider />
            <NoMarginTypography variant="body2">
              <b>Contributor: </b>
              {sighting.data_source_witness}
            </NoMarginTypography>
            <Divider />
            <NoMarginTypography variant="body2">
              <b>Time: </b>
              {created.format("h:ma Z")}
            </NoMarginTypography>
          </>
        )}
      </Box>
      <Divider variant="fullWidth" sx={{ borderColor: theme.alpha(theme.palette.divider, 0.25) }} />
      <Button fullWidth onClick={() => setExpanded(!expanded)} sx={{ color: "text.primary" }}>
        {expanded ? (
          <>
            See Less <Remove />
          </>
        ) : (
          <>
            See More <Add />
          </>
        )}
      </Button>
    </Poopup>
  );
}
