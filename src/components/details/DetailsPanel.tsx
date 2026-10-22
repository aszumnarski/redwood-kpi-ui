import { useState } from "react";

import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";

import type { CoverageViewRowDto } from "../../model/coverage";

import CoverageInfoTab from "./CoverageInfoTab";
import SummaryTab from "./SummaryTab";
import JobHistoryTab from "./JobHistoryTab";
import PerformanceTab from "./PerformanceTab";

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
      <Typography variant="h6" gutterBottom>
        Details
      </Typography>

      {!row && (
        <Typography color="text.secondary">
          Select a row to view details.
        </Typography>
      )}

      {row && (
        <>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Company:</strong> {row.companyCode}
            </Typography>

            <Typography variant="body2">
              <strong>Account Item:</strong> {row.accountItem}
            </Typography>

            <Typography variant="body2">
              <strong>Status:</strong> {row.coverageStatus}
            </Typography>
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
