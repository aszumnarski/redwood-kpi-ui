import { Card, CardContent, Grid, Typography } from "@mui/material";

import type { DashboardSummaryDto } from "../../model/coverage";

type Props = {
  summary: DashboardSummaryDto;

  onCoveragePercentageClick?: () => void;

  onStatusClick?: (status: string) => void;

};

function SummaryCard({
  title,
  value,
  color = "#111827",
  onClick,
}: {
  title: string;
  value: string | number;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <Card
      elevation={2}
      onClick={onClick}
      sx={{
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <CardContent>
        <Typography variant="caption" color="text.secondary">
          {title}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color,
            fontWeight: 600,
            mt: 1,
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function SummaryCards(props : Props) {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid size={{ xs: 12, sm: 6, md: 3, lg: 1.5 }}>
        <SummaryCard
          title="Coverage %"
          value={`${props.summary.coveragePercentage.toFixed(1)}%`}
          color="#16a34a"
          onClick={props.onCoveragePercentageClick}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3, lg: 1.5 }}>
        <SummaryCard
          title="Configured"
          value={props.summary.configuredCount.toLocaleString()}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3, lg: 1.5 }}>
        <SummaryCard
          title="Covered"
          value={props.summary.coveredCount.toLocaleString()}
          color="#16a34a"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3, lg: 1.5 }}>
        <SummaryCard
          title="Gaps"
          value={props.summary.gapCount.toLocaleString()}
          color="#dc2626"
          onClick={() => props.onStatusClick("Gap")}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3, lg: 1.5 }}>
        <SummaryCard
          title="CoE Covered"
          value={props.summary.coeCoveredCount.toLocaleString()}
          color="#16a34a"
          onClick={() => props.onStatusClick("CoE Covered")}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3, lg: 1.5 }}>
        <SummaryCard
          title="Business Covered"
          value={props.summary.businessCoveredCount.toLocaleString()}
          color="#2563eb"
          onClick={() => props.onStatusClick("Business Covered")}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3, lg: 1.5 }}>
        <SummaryCard
          title="Planned"
          value={props.summary.plannedCount.toLocaleString()}
          color="#ea580c"
          onClick={() => props.onStatusClick("Planned")}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3, lg: 1.5 }}>
        <SummaryCard
          title="Unexpected"
          value={props.summary.unexpectedExecutionCount.toLocaleString()}
          color="#64748b"
          onClick={() => props.onStatusClick("Unexpected Execution")}
        />
      </Grid>
    </Grid>
  );
}
