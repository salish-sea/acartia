import { AccountCircleOutlined, ChevronRight, HighlightOff } from "@mui/icons-material";
import { Avatar, Stack, Tab, Tabs, Typography, styled } from "@mui/material";
import type { User } from "@/types/api";
import { Logout } from "@/components/icons/logout";
import { TabLink } from "@/components/tab-link";
import { PlaceholderLogo } from "@/components/icons/placeholder-logo";

const SettingsTabs = styled(Tabs)(() => ({
  borderRadius: 6,
  border: "1px solid #EEF1F4", // TODO put color in theme somewhere
  // Disable indicator
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

const SettingsTab = styled(TabLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  minHeight: 52,
  maxHeight: 52,
  justifyContent: "start",
  "&:not(:last-of-type)": {
    borderBottom: "1px solid #EEF1F4",
  },
  "&.Mui-selected": {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.action.active,
  },
}));

/**
 * Custom component we use for the {@link Tab} label because we want a chevron and some other custom styling :).
 */
function SettingsTabLabel({ value }: Readonly<{ value: string }>) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      sx={{ pl: 1 }}
    >
      <span style={{ fontFamily: "inter", fontWeight: 400, textTransform: "none" }}>{value}</span>
      <ChevronRight />
    </Stack>
  );
}

type Props = {
  /**
   * The currently logged-in user.
   */
  user: User;

  /**
   * The current tab.
   */
  value: string;
};

/**
 * The menu that we show to on the left for the profile routes.
 */
export function ProfileMenu({ user, value }: Readonly<Props>) {
  return (
    <>
      <Stack alignItems="center" gap={2} maxWidth={375}>
        <Avatar
          sx={{
            backgroundColor: "transparent",
            borderWidth: 1,
            border: "solid",
            borderColor: "text.primary",
            width: 160,
            height: 160,
          }}
        >
          <PlaceholderLogo sx={{ color: "text.primary", strokeWidth: "10px" }} />
        </Avatar>
        <Stack alignItems="center">
          <Typography variant="body1">{user.name}</Typography>
          <Typography variant="body2">{user.email}</Typography>
        </Stack>
      </Stack>
      <Typography fontFamily="inter" fontWeight={600} variant="body2" sx={{ pb: 1 }}>
        Settings
      </Typography>
      <SettingsTabs value={value} orientation="vertical" variant="fullWidth">
        <SettingsTab
          label={<SettingsTabLabel value="Account Settings" />}
          icon={<AccountCircleOutlined sx={{ color: "text.primary" }} />}
          iconPosition="start"
          to="/profile/account-settings"
          value="/profile/account-settings"
        />
        <SettingsTab
          label={<SettingsTabLabel value="Delete Account" />}
          icon={<HighlightOff sx={{ color: "text.primary" }} />}
          iconPosition="start"
          to="/profile/delete-account"
          value="/profile/delete-account"
        />
        <SettingsTab
          label={<SettingsTabLabel value="Sign Out" />}
          icon={<Logout sx={{ fontSize: "large", color: "text.primary", ml: "4px" }} />}
          iconPosition="start"
        />
      </SettingsTabs>
    </>
  );
}
