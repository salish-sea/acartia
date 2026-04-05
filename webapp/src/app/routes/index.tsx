import { createRoute } from "@tanstack/react-router";
import { Box, styled } from "@mui/material";
import { z } from "zod";
import { rootRoute } from "@/app/routes/__root";
import { Map } from "@/features/map";
import { FilterPanel } from "@/features/filter-panel";

const PageLayout = styled(Box)(({ theme }) => ({
  display: "flex",
  height: "100%",
  justifyContent: "end",
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

const indexSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  species: z.array(z.string()).optional(),
  contributors: z.array(z.string()).optional(),
  trusted: z.boolean().optional(),
});

export function Index() {
  return (
    <PageLayout>
      <Map />
      <FilterPanel />
    </PageLayout>
  );
}

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
  validateSearch: (search) => indexSchema.parse(search),
});
