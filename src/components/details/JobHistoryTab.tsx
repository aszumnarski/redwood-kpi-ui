import { useEffect, useState } from "react";

import type { CoverageViewRowDto } from "../../model/coverage";
import type { JobExecutionDto } from "../../model/jobHistory";

import { getJobHistory } from "../../api/jobHistoryApi";

import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import JobStatusChip from "../JobStatusChip";
import { Box } from "@mui/material";
import JobHistorySummary from "./JobHistorySummary";

type Props = {
  row: CoverageViewRowDto | null;
};

export default function JobHistoryTab({ row }: Props) {
  const [jobs, setJobs] = useState<JobExecutionDto[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!row) {
      return;
    }

    loadJobs();
  }, [row]);

  async function loadJobs() {
    if (!row) {
      return;
    }

    setLoading(true);

    const result = await getJobHistory(
      row.companyCode ?? "",
      row.accountItem ?? ""
    );

    setJobs(result);

    setLoading(false);
  }

  const columns: GridColDef[] = [
    {
      field: "jobId",
      headerName: "Job Id",
      width: 120,
    },
    {
      field: "runDate",
      headerName: "Run Date",
      width: 180,
    },
    {
      field: "scheduleDate",
      headerName: "Schedule Date",
      width: 180,
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,

      renderCell: (params) => <JobStatusChip status={params.value} />,
    },
    {
      field: "openItems",
      headerName: "Open",
      width: 120,
      type: "number",
    },
    {
      field: "proposedItems",
      headerName: "Proposed",
      width: 120,
      type: "number",
    },
    {
      field: "clearedItems",
      headerName: "Cleared",
      width: 120,
      type: "number",
    },
  ];

  const rows = jobs.map((job) => ({
    id: job.jobId,
    ...job,
  }));

  const totalRuns = jobs.length;

  const successfulRuns = jobs.filter((j) =>
    j.status.toLowerCase().includes("complete")
  ).length;

  const errorRuns = jobs.filter((j) =>
    j.status.toLowerCase().includes("error")
  ).length;

  const successRate = totalRuns === 0 ? 0 : (successfulRuns * 100) / totalRuns;

  if (loading) {
    return <div>Loading job history...</div>;
  }

  return (
    <>
      <JobHistorySummary
        totalRuns={totalRuns}
        successfulRuns={successfulRuns}
        errorRuns={errorRuns}
        successRate={successRate}
      />

      <Box sx={{ mb: 3 }} />
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        sx={{
          border: 0,

          "& .MuiDataGrid-cell": {
            borderColor: "divider",
          },

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "background.paper",
          },
        }}
      />
    </>
  );
}
