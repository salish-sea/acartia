import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Autocomplete,
  Button,
  Divider,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { DateRange } from "@/features/filter-panel";
import { DateRangeCalendar, getFilterOptions } from "@/features/filter-panel";
import { api } from "@/lib/api";

type Filters = {
  species: Array<string>;
  contributors: Array<string>;
  trusted: boolean;
} & DateRange;

const defaultFilters: Filters = {
  species: [],
  contributors: [],
  trusted: true,
  startDate: null,
  endDate: null,
};

/**
 * The container for inputs for filtering on sightings.
 */
export function FilterSightingsCard() {
  const navigate = useNavigate({ from: "/" });
  const query = useSearch({ from: "/" });
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const { data: options, isLoading } = api.useQuery(
    "get",
    "/sightings",
    { params: { query } },
    { select: getFilterOptions },
  );

  const handleDateChange = (dateRange: DateRange | ((prev: DateRange) => DateRange)) => {
    if (typeof dateRange === "function") {
      setFilters((prev) => ({
        ...prev,
        ...dateRange({ startDate: prev.startDate, endDate: prev.endDate }),
      }));
    } else {
      setFilters((prev) => ({ ...prev, ...dateRange }));
    }
  };

  const handleSubmit = () => {
    const { startDate, endDate, species, contributors, trusted } = filters;
    navigate({
      to: "/",
      search: {
        startDate: startDate?.format("YYYY-MM-DD"),
        endDate: endDate?.format("YYYY-MM-DD"),
        ...(species.length > 0 && { species }),
        ...(contributors.length > 0 && { contributors }),
        ...(trusted === false && { trusted }),
      },
    });
  };

  return (
    <Stack gap={2} paddingX="36px" paddingY="24px" overflow="auto">
      <Stack direction="column" gap={1.5} marginTop={1.5}>
        <Typography variant="h3">Filter Sightings</Typography>
        <Typography variant="body1">
          Refine data points displayed on the map by selecting one or multiple filtering options, as
          specified below.
        </Typography>
      </Stack>
      <Stack gap={2}>
        <FormLabel>
          <Typography variant="body2">Date range</Typography>
        </FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction="row" gap={2}>
            <DatePicker
              label="Start Date"
              value={filters.startDate}
              sx={{
                flex: "1 1 150px",
                "& .MuiPickersInputBase-root": { backgroundColor: "white" },
                "& .MuiPickersSectionList-root": { fontSize: "14px", opacity: 1 },
                "& .MuiButtonBase-root": { pl: 0 },
              }}
              slotProps={{
                textField: {
                  helperText: "MM/DD/YYYY",
                  placeholder: "text",
                  InputLabelProps: { shrink: true, sx: { backgroundColor: "white" } },
                },
                openPickerButton: { onClick: () => setCalendarOpen(!calendarOpen) },
              }}
            />
            <Typography variant="caption" alignContent="center">
              to
            </Typography>
            <DatePicker
              label="End Date (Optional)"
              value={filters.endDate}
              name="bob"
              sx={{
                flex: "1 1 150px",
                "& .MuiPickersInputBase-root": { backgroundColor: "white" },
                "& .MuiPickersSectionList-root": { fontSize: "14px", opacity: 1 },
                "& .MuiButtonBase-root": { pl: 0 },
              }}
              slotProps={{
                textField: {
                  placeholder: "test",
                  helperText: "MM/DD/YYYY",
                  InputLabelProps: { shrink: true, sx: { backgroundColor: "white" } },
                  inputProps: {
                    placeholder: "test",
                  },
                },
                openPickerButton: { onClick: () => setCalendarOpen(!calendarOpen) },
              }}
            />
          </Stack>
          <DateRangeCalendar
            open={calendarOpen}
            value={{ startDate: filters.startDate, endDate: filters.endDate }}
            onChange={handleDateChange}
            onClose={() => setCalendarOpen(false)}
          />
        </LocalizationProvider>
      </Stack>

      <Stack gap={1}>
        <FormLabel>
          <Typography variant="body2">Species</Typography>
        </FormLabel>
        <Autocomplete
          value={filters.species}
          onChange={(_e, species) => setFilters((prev) => ({ ...prev, species }))}
          options={Array.from(options?.speciesOptions ?? [])}
          loading={isLoading}
          multiple
          limitTags={1}
          popupIcon={<ExpandMoreRounded fontSize="medium" sx={{ color: "text.primary" }} />}
          renderInput={(params) => (
            <TextField
              {...params}
              {...(filters.species.length === 0 && { placeholder: "All Species" })}
              size="small"
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                  sx: { "::placeholder": { opacity: 1 } },
                },
              }}
              sx={{ "& .MuiInputBase-root": { minHeight: "48px", backgroundColor: "white" } }}
            />
          )}
        />
      </Stack>

      <Stack gap={1}>
        <FormLabel>
          <Typography variant="body2">Contributor</Typography>
        </FormLabel>
        <Autocomplete
          value={filters.contributors}
          onChange={(_e, contributors) => setFilters((prev) => ({ ...prev, contributors }))}
          options={Array.from(options?.contributorOptions ?? [])}
          loading={isLoading}
          multiple
          limitTags={1}
          popupIcon={<ExpandMoreRounded fontSize="medium" sx={{ color: "text.primary" }} />}
          renderInput={(params) => (
            <TextField
              {...params}
              {...(filters.contributors.length === 0 && { placeholder: "All Contributor(s)" })}
              size="small"
              slotProps={{
                htmlInput: { ...params.inputProps, sx: { "::placeholder": { opacity: 1 } } },
              }}
              sx={{
                "& .MuiInputBase-root": {
                  minHeight: "48px",
                  backgroundColor: "white",
                },
              }}
            />
          )}
        />
      </Stack>
      <Divider variant="fullWidth" />
      <Stack gap={1.5} alignItems="end">
        <Typography variant="body2">Show X results</Typography>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ maxWidth: "150px", color: "white" }}
        >
          Apply Filters
        </Button>
        <Button
          variant="outlined"
          onClick={() => setFilters(defaultFilters)}
          sx={{ maxWidth: "150px" }}
        >
          Reset Filters
        </Button>
      </Stack>
    </Stack>
  );
}
