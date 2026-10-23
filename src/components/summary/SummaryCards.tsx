import PercentIcon from "@mui/icons-material/Percent";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import BusinessIcon from "@mui/icons-material/Business";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import ErrorIcon from "@mui/icons-material/Error";

import type { DashboardSummaryDto } from "../../model/coverage";
import { Grid } from "@mui/material";
import SummaryCard from "./SummaryCard";

type Props = {
  summary: DashboardSummaryDto;

  onCoveragePercentageClick?: () => void;

  onStatusClick?: (status: string) => void;
};

export default function SummaryCards(props: Props) {
  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid size={{ xs: 12, sm: 6, md: 3, lg: 1.5 }}>
        <SummaryCard
          title="Coverage %"
          value={`${props.summary.coveragePercentage.toFixed(1)}%`}
          color="#16a34a"
          icon={<PercentIcon />}
          progress={props.summary.coveragePercentage}
          onClick={props.onCoveragePercentageClick}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3, lg: 1.5 }}>
        <SummaryCard
          title="Configured"
          value={props.summary.configuredCount.toLocaleString()}
          color="#64748b"
          icon={<SettingsIcon />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3, lg: 1.5 }}>
        <SummaryCard
          title="Covered"
          value={props.summary.coveredCount.toLocaleString()}
          color="#16a34a"
          icon={<CheckCircleIcon />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3, lg: 1.5 }}>
        <SummaryCard
          title="Gaps"
          value={props.summary.gapCount.toLocaleString()}
          color="#dc2626"
          icon={<WarningIcon />}
        />
      </Grid>
    </Grid>
  );
}
