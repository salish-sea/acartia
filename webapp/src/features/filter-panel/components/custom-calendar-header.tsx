import { IconButton, MenuItem, Select, Stack, Typography } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import type { PickersCalendarHeaderProps } from "@mui/x-date-pickers";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * A custom component to replace the default Header component for the mui date calendar component.
 */
export function CustomCalendarHeader({
  currentMonth,
  onMonthChange,
  view,
  views,
  onViewChange,
}: Readonly<PickersCalendarHeaderProps>) {
  const month = currentMonth.format("MMM");
  const year = currentMonth.format("YYYY");

  const handleViewChange = () => {
    if (!onViewChange) return;
    const currentView = views.indexOf(view);
    if (currentView === 0) {
      onViewChange(views[1]);
    } else {
      onViewChange(views[0]);
    }
  };

  return (
    <Stack direction="row" justifyContent="space-around" height="47px">
      <span>
        <IconButton onClick={() => onMonthChange(currentMonth.subtract(1, "month"))}>
          <NavigateBefore />
        </IconButton>
        <Select
          size="small"
          value={month}
          onChange={(e) => onMonthChange(currentMonth.month(months.indexOf(e.target.value)))}
          sx={{ ".MuiOutlinedInput-notchedOutline": { border: "none" } }}
          MenuProps={{ PaperProps: { sx: { maxHeight: "250px" } } }}
        >
          {months.map((option) => (
            <MenuItem key={option} value={option}>
              <Typography variant="caption" color="text.secondary">
                {option}
              </Typography>
            </MenuItem>
          ))}
        </Select>
        <IconButton onClick={() => onMonthChange(currentMonth.add(1, "month"))}>
          <NavigateNext />
        </IconButton>
      </span>
      <span style={{ width: "157px" }}>
        <IconButton onClick={() => onMonthChange(currentMonth.subtract(1, "year"))}>
          <NavigateBefore />
        </IconButton>
        {/* using a select here isn't the best for accessibility */}
        <Select
          size="small"
          open={false} // prevent from opening
          value={year}
          onOpen={handleViewChange}
          sx={{ ".MuiOutlinedInput-notchedOutline": { border: "none" } }}
          MenuProps={{ PaperProps: { sx: { maxHeight: "250px" } } }}
        >
          <MenuItem value={year}>
            <Typography variant="caption" color="text.secondary">
              {year}
            </Typography>
          </MenuItem>
        </Select>
        <IconButton onClick={() => onMonthChange(currentMonth.add(1, "year"))}>
          <NavigateNext />
        </IconButton>
      </span>
    </Stack>
  );
}
