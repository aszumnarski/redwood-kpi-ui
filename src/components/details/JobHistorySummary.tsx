import { Card, CardContent, Grid, Typography } from "@mui/material";

type Props = {
  totalRuns: number;
  successfulRuns: number;
  errorRuns: number;
  successRate: number;
};

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Typography variant="caption" color="text.secondary">
          {title}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            mt: 1,
            fontWeight: 700,
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function JobHistorySummary({
  totalRuns,
  successfulRuns,
  errorRuns,
  successRate,
}: Props) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 6, md: 3 }}>
        <MetricCard title="Runs" value={totalRuns} />
      </Grid>

      <Grid size={{ xs: 6, md: 3 }}>
        <MetricCard title="Success" value={successfulRuns} />
      </Grid>

      <Grid size={{ xs: 6, md: 3 }}>
        <MetricCard title="Errors" value={errorRuns} />
      </Grid>

      <Grid size={{ xs: 6, md: 3 }}>
        <MetricCard title="Rate" value={`${successRate.toFixed(0)}%`} />
      </Grid>
    </Grid>
  );
}
