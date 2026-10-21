import { useNavigate } from "@tanstack/react-router";
import { AddRounded, FileDownloadOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { Github } from "@/components/icons/github";
import { TileButton } from "@/components/tile-button";
import { ContributeHand } from "@/components/icons/contribute-hand";

/**
 *
 * TODO:
 * [ ] - Tile button icons.
 * [ ] - Warning alert on login page saying this is an alpha
 * [ ] - Fix the sightings filtering for species & contributors
 * [ ] - Add a 'trusted' filter to sightings panel
 * [ ] - Loading skeleton for profile page.
 */

/**
 * Acartia about page. This is client rendered which isn't great.
 */
export function AboutAcartia() {
  const navigate = useNavigate({ from: "/about" });

  return (
    <Stack direction="column" sx={{ width: "100%" }}>
      <img src="/HeroPhoto.png" style={{ width: "100%" }} />
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "100%", mx: 3 }}
      >
        <Stack alignItems="center" gap={3} sx={{ py: "64px" }}>
          <Typography variant="h1" fontFamily="Mukta" sx={{ color: "text.tertiary" }}>
            About Acartia
          </Typography>
          <Typography
            variant="body1"
            fontFamily="Montserrat"
            sx={{ maxWidth: 1080, color: "text.tertiary" }}
          >
            Welcome to Acartia! Acartia is a collaborative platform designed to share information
            about the whereabouts of marine animals in the Salish Sea. It's named after a tiny
            creature called a copepod found in Puget Sound. But its primary goal is to help protect
            the endangered Southern Resident killer whales. Dive into our platform to discover the
            whereabouts of marine life in this vibrant ecosystem.
          </Typography>
        </Stack>
        <Box sx={{ my: 3 }}>
          <Typography variant="h2" sx={{ color: "text.tertiary" }}>
            Frequently Asked Questions
          </Typography>
          <Stack gap={1} sx={{ width: "100%", maxWidth: "552px", mt: 3 }}>
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary expandIcon={<AddRounded />}>
                <Typography variant="body1" fontWeight={600} sx={{ color: "text.tertiary" }}>
                  How does Acartia work?{" "}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ color: "text.tertiary" }}>
                  Acartia aggregates data from multiple sources and shares it through our platform.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary expandIcon={<AddRounded />}>
                <Typography variant="body1" fontWeight={600} sx={{ color: "text.tertiary" }}>
                  Who created Acartia?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ color: "text.tertiary" }}>
                  Acartia was created by typehuman with the support of conserve.io and other
                  partners.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary expandIcon={<AddRounded />}>
                <Typography variant="body1" fontWeight={600} sx={{ color: "text.tertiary" }}>
                  How does Acartia ensure the accuracy of data submissions?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ color: "text.tertiary" }}>
                  Sighting submissions are verified by our administrator.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary expandIcon={<AddRounded />}>
                <Typography variant="body1" fontWeight={600} sx={{ color: "text.tertiary" }}>
                  What role does Acartia play in education and outreach about marine life in the
                  Salish Sea?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ color: "text.tertiary" }}>
                  Acartia plays a crucial role in educating the public about marine life
                  conservation.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ width: "100%" }}>
              <AccordionSummary expandIcon={<AddRounded />}>
                <Typography variant="body1" fontWeight={600} sx={{ color: "text.tertiary" }}>
                  How can I get involved with Acartia?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ color: "text.tertiary" }}>
                  You can get involved by contributing data, participating in outreach programs and
                  more.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Box>
        <Stack alignItems="center" gap={3} sx={{ my: 6, width: "100%" }}>
          <Typography variant="h2" sx={{ color: "text.tertiary" }}>
            Want to do more? Check out these links!
          </Typography>
          <Stack
            gap={3}
            sx={{
              flexDirection: { md: "column", lg: "row" },
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
              mb: 5,
            }}
          >
            <TileButton
              title="How to contribute"
              description="New to uploading data? Click here to learn how you can provide data."
              icon={<ContributeHand />}
              // TODO: navigate to /contribute page
              onClick={() => navigate({ to: "/" })}
            />
            <TileButton
              title="Github"
              description="Integrate your application with Acartia."
              icon={<Github />}
              onClick={() =>
                navigate({ href: "https://github.com/salish-sea/acartia", reloadDocument: true })
              }
            />
            <TileButton
              title="Export Data"
              description="Download Acartia sightings data here."
              icon={<FileDownloadOutlined sx={{ color: "text.tertiary" }} />}
              onClick={() => navigate({ to: "/" })}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
