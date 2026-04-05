import { createContext, useContext, useMemo, useState } from "react";
import { Box, Button, Paper, Stack, alpha, styled } from "@mui/material";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import type { PickersDayProps } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";
import type { DateRange } from "@/features/filter-panel";
import { CustomCalendarHeader } from "@/features/filter-panel";

const PickersDayContext = createContext<DateRange>({ startDate: null, endDate: null });

/**
 * TODO: show a preview on hover
 * TODO: Change selected color to match figma
 */
export function CustomDayPicker({ day, ...props }: Readonly<PickersDayProps>) {
  const { startDate, endDate } = useContext(PickersDayContext);
  const selected: boolean = day.isSame(startDate) || day.isSame(endDate);
  const isBetweenSelected = day.isAfter(startDate) && day.isBefore(endDate);
  const shadeBackground = selected || isBetweenSelected;
  const shouldRoundLeftCorners = day.isSame(startDate) || day.day() === 0;
  const shouldRoundRightCorners = day.isSame(endDate) || day.day() === 6;
  const shouldRoundBothCorners = selected && !endDate;

  return (
    <Box
      sx={{
        ...(shadeBackground && {
          backgroundColor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
        }),
        ...(shouldRoundLeftCorners && {
          borderRadius: "50% 0% 0% 50%",
        }),
        ...(shouldRoundRightCorners && {
          borderRadius: "0% 50% 50% 0%",
        }),
        ...(shouldRoundBothCorners && {
          borderRadius: "50%",
        }),
      }}
    >
      <PickersDay
        {...props}
        day={day}
        selected={selected}
        sx={{
          margin: "0px",
          fontSize: "14px",
          fontFamily: "Montserrat",
          width: "44px",
          height: "44px",
        }}
      />
    </Box>
  );
}

const CalendarButton = styled(Button)(() => ({
  fontSize: "14px",
  height: "100%",
  width: "40px",
}));

type DateRangeCalendarProps = {
  open: boolean;
  value: DateRange;
  onChange: (dateRange: DateRange | ((prev: DateRange) => DateRange)) => void;
};

export function DateRangeCalendar({ open, value, onChange }: Readonly<DateRangeCalendarProps>) {
  const [focusedInput, setFocusedInput] = useState<"start" | "end">("start");
  const memoDateRange = useMemo(() => value, [value]);

  // TODO: simplify this function.
  // TODO: This doesn't quite work how it should, fix it!
  const handleChange = (newValue: Dayjs | null) => {
    const { startDate, endDate } = value;

    if (!newValue) return;

    if (!startDate) {
      onChange((prev) => ({ ...prev, startDate: newValue }));
      setFocusedInput("start");
      return;
    }

    if (!endDate) {
      if (newValue.isAfter(startDate)) {
        onChange((prev) => ({ ...prev, endDate: newValue }));
        setFocusedInput("end");
      } else {
        onChange({ startDate: newValue, endDate: null });
        setFocusedInput("start");
      }
      return;
    }

    // end date is focussed so we set the start date
    if (focusedInput === "end") {
      if (newValue.isSame(endDate) || newValue.isAfter(endDate)) {
        onChange({ startDate: newValue, endDate: null });
        setFocusedInput("start");
      } else {
        onChange((prev) => ({ ...prev, startDate: newValue }));
        setFocusedInput("start");
      }
    } else {
      if (newValue.isSame(startDate) || newValue.isBefore(startDate)) {
        onChange({ startDate: newValue, endDate: null });
        setFocusedInput("start");
      } else {
        onChange((prev) => ({ ...prev, endDate: newValue }));
        setFocusedInput("end");
      }
    }
  };

  if (!open) return;

  return (
    <Paper sx={{ py: 1, borderRadius: "16px", maxHeight: "456px" }}>
      <PickersDayContext.Provider value={memoDateRange}>
        <DateCalendar
          onChange={handleChange}
          value={value.startDate}
          showDaysOutsideCurrentMonth
          slots={{ calendarHeader: CustomCalendarHeader, day: CustomDayPicker }}
          sx={{
            maxHeight: "400px",
            height: "400px",
            ".MuiDayCalendar-weekDayLabel": {
              margin: "5px",
              fontSize: "14px",
              fontFamily: "Montserrat",
            },
            "& .MuiDayCalendar-monthContainer": {
              // Prevent weird overflow issue, might cause issue later.
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              // my: 2,
            },
            "& .MuiPickersSlideTransition-root": {
              minHeight: "300px", // Set this to your desired height
              height: "300px", // Optional: force a fixed height
            },
          }}
        />
      </PickersDayContext.Provider>
      <Stack direction="row" justifyContent="space-between" height="55px" sx={{ px: 1 }}>
        <CalendarButton>Clear</CalendarButton>
        <Box>
          <CalendarButton>Cancel</CalendarButton>
          <CalendarButton>OK</CalendarButton>
        </Box>
      </Stack>
    </Paper>
  );
}
