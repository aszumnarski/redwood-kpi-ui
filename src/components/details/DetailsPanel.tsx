import { useState } from "react";

import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";

import type { CoverageViewRowDto } from "../../model/coverage";

import CoverageInfoTab from "./CoverageInfoTab";
import SummaryTab from "./SummaryTab";
import JobHistoryTab from "./JobHistoryTab";
import PerformanceTab from "./PerformanceTab";
import StatusChip from "../StatusChip";

type Props = {
  row: CoverageViewRowDto | null;
};

export default function DetailsPanel({ row }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        mt: 3,
        p: 2,
      }}
    >
      {row && (
        <>
          <Typography variant="h5" gutterBottom>
            {row.accountItem}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 2,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              Company: {row.companyCode}
            </Typography>
            <StatusChip status={row.coverageStatus} />
          </Box>

          <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="Coverage Info" />
            <Tab label="Summary" />
            <Tab label="Job History" />
            <Tab label="Performance" />
          </Tabs>

          <Box sx={{ minHeight: 300 }}>
            {activeTab === 0 && <CoverageInfoTab row={row} />}

            {activeTab === 1 && <SummaryTab row={row} />}

            {activeTab === 2 && <JobHistoryTab row={row} />}

            {activeTab === 3 && <PerformanceTab row={row} />}
          </Box>
        </>
      )}
    </Paper>
  );
}
