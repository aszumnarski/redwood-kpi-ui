import { Box, Card, CardContent, InputAdornment, TextField, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import ActiveFilters from "../filters/ActiveFilters";
import CoverageTable from "../coverage/CoverageTable";

import type {
  CoverageFilter,
  CoverageViewRowDto,
} from "../../model/coverage";

type Props = {
  filter: CoverageFilter;
  rows: CoverageViewRowDto[];
  selectedRow: CoverageViewRowDto | null;

  onFilterChange: (
    filter: CoverageFilter
  ) => void;

  onClearFilters: () => void;

  onRowSelected: (
    row: CoverageViewRowDto
  ) => void;
};

export default function InvestigationSection({
  filter,
  rows,
  selectedRow,
  onFilterChange,
  onClearFilters,
  onRowSelected,
}: Props) {
  return (
    <Card elevation={0}>
      <CardContent>
      <ActiveFilters
        filter={filter}
        onClear={onClearFilters}
        onRemoveFilter={(key) => {

            const next = {
              ...filter,
            };
        
            delete next[key];
        
            onFilterChange(next);
        
          }}
      />

      <Box sx={{ mb: 2 }} />

      <TextField
        fullWidth
        placeholder="Search company, account, category or status"
        aria-label="Search coverage inventory"
        size="small"
        value={filter.searchText ?? ""}
        slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchRoundedIcon fontSize="small" /></InputAdornment> } }}
        onChange={(e) =>
          onFilterChange({
            ...filter,
            searchText: e.target.value,
          })
        }
      />

      <Box sx={{ mb: 2 }} />

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 1.5 }}
      >
        Showing {rows.length.toLocaleString()} rows
      </Typography>

      <Box sx={{ mb: 2 }} />

      <CoverageTable
        rows={rows}
        selectedRow={selectedRow}
        onRowSelected={onRowSelected}
      />
      </CardContent>
    </Card>
  );
}
