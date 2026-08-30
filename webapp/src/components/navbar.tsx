import { useState } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import {
  AccountCircleOutlined,
  // AssessmentOutlined,
  ExpandMore,
  // GroupOutlined,
  // HelpOutlineRounded,
  Language,
  Logout,
  PersonAddAlt1Outlined,
} from "@mui/icons-material";
import type { MouseEvent } from "react";
import type { User } from "@/types/api";
import { ButtonLink } from "@/components/button-link";
import { ListItemButtonLink } from "@/components/list-item-button-link";
import { Link } from "@/components/link";
import { Menu as MenuIcon } from "@/components/icons/menu";
import { PlaceholderLogo } from "@/components/icons/placeholder-logo";
import { useAuthentication } from "@/hooks/use-authentication";

const NavLink = styled(Link, { shouldForwardProp: (prop) => prop !== "active" })<{
  active: boolean;
}>(({ active, theme }) => ({
  color: theme.palette.text.contrast,
  fontWeight: active ? 600 : 400,
  fontSize: "18px",
  fontFamily: "Montserrat",
}));

const ListItemButtonNavLink = styled(ListItemButtonLink, {
  shouldForwardProp: (prop) => prop !== "active",
})<{
  active: boolean;
}>(({ active, theme }) => ({
  ...(active && { backgroundColor: alpha(theme.palette.text.contrast, 0.05) }),
  fontWeight: active ? 600 : 400,
}));

const NavListItem = styled(ListItem)(() => ({
  padding: 0,
  minHeight: "52px",
}));

const navItems = [
  { to: "/", label: "Map", icon: <Language fontSize="small" /> },
  // { to: "/about", label: "About", icon: <HelpOutlineRounded fontSize="small" /> },
  // { to: "/partners", label: "Partners", icon: <GroupOutlined fontSize="small" /> },
  // { to: "/reports", label: "Reports", icon: <AssessmentOutlined fontSize="small" /> },
];

/**
 * The nav-bar!
 */
export function Navbar() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const { data: user, isLoading } = useAuthentication();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "primary.lighter",
          height: 70,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            gap: "80px",
            px: { xs: "16px", sm: "16px", md: "48px" },
            minHeight: "100% !important",
          }}
        >
          <Stack direction="row" alignItems="center" gap={2.5} flexGrow={1}>
            <PlaceholderLogo />
            <Typography
              variant="h2"
              color="text.contrast"
              sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            >
              ACARTIA
            </Typography>
          </Stack>

          {isLoading ? <NavbarLinksSkeleton /> : <NavbarLinks user={user} pathname={pathname} />}

          <IconButton size="large" onClick={toggleDrawer} sx={{ display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="top"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ mt: "70px" }}
        slotProps={{ paper: { sx: { borderRadius: "0px 0px 16px 16px" } } }}
      >
        <Box sx={{ mt: "60px", backgroundColor: "primary.lighter" }}>
          <List>
            {navItems.map(({ to, label, icon }) => (
              <NavListItem key={to} sx={{ px: 0, color: "text.contrast" }}>
                <ListItemButtonNavLink to={to} active={pathname === to}>
                  <ListItemIcon sx={{ color: "text.contrast", minWidth: "30px" }}>
                    {icon}
                  </ListItemIcon>
                  {label}
                </ListItemButtonNavLink>
              </NavListItem>
            ))}
            {/* TODO: same here */}
            {user ? (
              <>
                <NavListItem sx={{ px: 0, color: "text.contrast" }}>
                  <ListItemButtonNavLink to="/" active={pathname === "/login"}>
                    <ListItemIcon sx={{ color: "text.contrast", minWidth: "30px" }}>
                      <AccountCircleOutlined fontSize="small" />
                    </ListItemIcon>
                    Profile
                  </ListItemButtonNavLink>
                </NavListItem>
                <Divider />
                <NavListItem sx={{ px: 0, color: "text.contrast" }}>
                  <ListItemButtonNavLink to="/logout" active={false}>
                    <ListItemIcon sx={{ color: "#00585d", minWidth: "30px" }}>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Log Out
                  </ListItemButtonNavLink>
                </NavListItem>
              </>
            ) : (
              <>
                <NavListItem sx={{ px: 0, color: "text.contrast" }}>
                  <ListItemButtonNavLink to="/login" active={pathname === "/login"}>
                    <ListItemIcon sx={{ color: "text.contrast", minWidth: "30px" }}>
                      <AccountCircleOutlined fontSize="small" />
                    </ListItemIcon>
                    Log In
                  </ListItemButtonNavLink>
                </NavListItem>
                <NavListItem sx={{ px: 0, color: "text.contrast" }}>
                  <ListItemButtonNavLink to="/signup" active={pathname === "/signup"}>
                    <ListItemIcon sx={{ color: "#00585d", minWidth: "30px" }}>
                      <PersonAddAlt1Outlined fontSize="small" />
                    </ListItemIcon>
                    Sign Up
                  </ListItemButtonNavLink>
                </NavListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

type Props = {
  /**
   * The signed-in user, is undefined if the user is not signed in, used to conditionally render stuff.
   */
  user: User | undefined;

  /**
   * The pathname, for links and stuff.
   */
  pathname: string;
};

function NavbarLinks({ user, pathname }: Readonly<Props>) {
  return (
    <>
      <Stack direction="row" gap="24px" sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
        {navItems.map(({ to, label }) => (
          <NavLink key={to} to={to} active={pathname === to} underline="none">
            {label}
          </NavLink>
        ))}
      </Stack>

      <Stack direction="row" gap="20px" sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
        {user ? (
          <ProfileMenu />
        ) : (
          <>
            <ButtonLink to="/login" variant="contained" sx={{ width: 120 }}>
              Log in
            </ButtonLink>
            <ButtonLink to="/signup" variant="outlined" sx={{ width: 120 }}>
              Sign up
            </ButtonLink>
          </>
        )}
      </Stack>
    </>
  );
}

function NavbarLinksSkeleton() {
  return (
    <Stack direction="row" gap="24px">
      <Skeleton width={54} height={36} />
      <Skeleton width={48} />
      <Skeleton width={48} />
      <Skeleton width={48} />
    </Stack>
  );
}

/**
 * Profile menu, displayed when the user is logged in.
 * TODO: Make links work.
 * TODO: Consider bringing this back in inline to the <Navbar /> component.
 *
 * @returns
 */
function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleClick} sx={{ ":hover": { backgroundColor: "transparent" } }}>
        <AccountCircleOutlined fontSize="large" sx={{ color: "text.contrast" }} />
        <ExpandMore fontSize="medium" sx={{ color: "text.contrast" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{ paper: { sx: { backgroundColor: "primary.lightest" } } }}
      >
        <MenuItem>Update Profile</MenuItem>
        <MenuItem>Create Token</MenuItem>
        <MenuItem>Contributor Profile</MenuItem>
        <MenuItem>Delete Profile</MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Log Out
        </MenuItem>
      </Menu>
    </>
  );
}
