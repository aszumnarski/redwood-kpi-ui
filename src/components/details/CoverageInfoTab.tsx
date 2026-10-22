import { Card, CardContent, Grid, Typography } from "@mui/material";

import type { CoverageViewRowDto } from "../../model/coverage";

type Props = {
  row: CoverageViewRowDto | null;
};

export default function CoverageInfoTab({ row }: Props) {
  if (!row) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">Coverage Information</Typography>

          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Select a row from the Coverage table to display reconciliation
            details.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Coverage Information
        </Typography>

        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography variant="body2" color="text.secondary">
              Coverage Status
            </Typography>
            <Typography>{row.coverageStatus}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography variant="body2" color="text.secondary">
              Company Code
            </Typography>
            <Typography>{row.companyCode ?? "-"}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography variant="body2" color="text.secondary">
              Account Item
            </Typography>
            <Typography>{row.accountItem ?? "-"}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography variant="body2" color="text.secondary">
              Category
            </Typography>
            <Typography>{row.category ?? "-"}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography variant="body2" color="text.secondary">
              Frequency
            </Typography>
            <Typography>{row.frequency ?? "-"}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography variant="body2" color="text.secondary">
              Recon Type
            </Typography>
            <Typography>{row.reconType ?? "-"}</Typography>
          </Grid>

          <Grid size={6}>
            <Typography variant="body2" color="text.secondary">
              Executions
            </Typography>
            <Typography>{row.executionCount}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
