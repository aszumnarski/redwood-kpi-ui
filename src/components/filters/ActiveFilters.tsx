import { Box, Button, Chip, Typography } from "@mui/material";
import type { CoverageFilter } from "../../model/coverage";

type Props = {
  filter: CoverageFilter;
  onClear: () => void;
  onRemoveFilter: (key: keyof CoverageFilter) => void;
};

export default function ActiveFilters({
  filter,
  onClear,
  onRemoveFilter,
}: Props) {
  const entries = Object.entries(filter).filter(([_, value]) => value);

  if (entries.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        Active Filters
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {entries.map(([key, value]) => (
          <Chip
            key={key}
            label={`${key}: ${value}`}
            onDelete={() => onRemoveFilter(key as keyof CoverageFilter)}
          />
        ))}

        <Button size="small" onClick={onClear}>
          Clear All
        </Button>
      </Box>
    </Box>
  );
}
