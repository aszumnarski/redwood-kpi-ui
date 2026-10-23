import { Box, TextField, Typography } from "@mui/material";

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
    <>
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
        label="Search"
        value={filter.searchText ?? ""}
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
      >
        Showing {rows.length.toLocaleString()} rows
      </Typography>

      <Box sx={{ mb: 2 }} />

      <CoverageTable
        rows={rows}
        selectedRow={selectedRow}
        onRowSelected={onRowSelected}
      />
    </>
  );
}