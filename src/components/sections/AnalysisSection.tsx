import { Box, Grid } from "@mui/material";

import GapChart from "../charts/GapChart";

import type { DashboardSummaryDto } from "../../model/coverage";

type Props = {
  summary: DashboardSummaryDto;

  onCategoryClick: (category: string) => void;

  onCompanyClick: (companyCode: string) => void;

  onFrequencyClick: (frequency: string) => void;
};

export default function AnalysisSection({
  summary,
  onCategoryClick,
  onCompanyClick,
  onFrequencyClick,
}: Props) {
  return (
    <>
      <GapChart
        title="Gap By Category"
        data={summary.gapsByCategory}
        onBarClick={onCategoryClick}
      />

      <Box sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <GapChart
            title="Gap By Company"
            data={summary.gapsByCompany}
            onBarClick={onCompanyClick}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <GapChart
            title="Gap By Frequency"
            data={summary.gapsByFrequency}
            onBarClick={onFrequencyClick}
          />
        </Grid>
      </Grid>
    </>
  );
}
