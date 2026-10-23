import { Alert, Paper } from "@mui/material";

import type { CoverageViewRowDto } from "../../model/coverage";

import DetailsPanel from "../details/DetailsPanel";

type Props = {
  row: CoverageViewRowDto | null;
};

export default function DetailsSection({ row }: Props) {
  if (!row) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Select a row from the Coverage Inventory table to inspect Coverage,
        Summary, Job History and Performance details.
      </Alert>
    );
  }

  return (
    <Paper
      elevation={2}
      sx={{
        mt: 3,
        p: 2,
      }}
    >
      <DetailsPanel row={row} />
    </Paper>
  );
}
