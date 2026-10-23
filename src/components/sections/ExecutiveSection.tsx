import { Box } from "@mui/material";

import SummaryCards from "../summary/SummaryCards";
import CoverageDonut from "../charts/CoverageDistributionChart";

import type { DashboardSummaryDto } from "../../model/coverage";

type Props = {
  summary: DashboardSummaryDto;

  onCoveragePercentageClick: () => void;

  onStatusClick: (
    status: string
  ) => void;
};

export default function ExecutiveSection({
  summary,
  onCoveragePercentageClick,
  onStatusClick,
}: Props) {
  return (
    <>
      <SummaryCards
        summary={summary}
        onCoveragePercentageClick={
          onCoveragePercentageClick
        }
        onStatusClick={onStatusClick}
      />

      <Box sx={{ mb: 3 }} />

      <CoverageDonut
        summary={summary}
        onStatusClick={onStatusClick}
      />
    </>
  );
}