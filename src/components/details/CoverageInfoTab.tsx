import { Grid, Paper, Typography } from "@mui/material";

import type { CoverageViewRowDto } from "../../model/coverage";

type Props = {
  row: CoverageViewRowDto;
};

function InfoField({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  return (
    <div>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>

      <Typography variant="body1">{value ?? "-"}</Typography>
    </div>
  );
}

export default function CoverageInfoTab({ row }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
      }}
    >
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <InfoField label="Coverage Status" value={row.coverageStatus} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoField label="Company Code" value={row.companyCode} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoField label="Account Item" value={row.accountItem} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoField label="Category" value={row.category} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoField label="Frequency" value={row.frequency} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoField label="Recon Type" value={row.reconType} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <InfoField label="Executions" value={row.executionCount} />
        </Grid>
      </Grid>
    </Paper>
  );
}
