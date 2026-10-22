import { useEffect, useState } from "react";

import { getDashboard } from "../api/dashboardApi";

import type {
  CoverageDashboardDto,
  CoverageFilter,
  CoverageViewRowDto,
} from "../model/coverage";

import SummaryCards from "../components/summary/SummaryCards";
import CoverageTable from "../components/coverage/CoverageTable";
import GapChart from "../components/GapChart";
import DetailsPanel from "../components/details/DetailsPanel";
import ActiveFilters from "../components/filters/ActiveFilters";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

type Props = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

function DashboardPage({ darkMode, setDarkMode }: Props) {
  const [filter, setFilter] = useState<CoverageFilter>({});

  const [dashboard, setDashboard] = useState<CoverageDashboardDto | null>(null);

  const [selectedRow, setSelectedRow] = useState<CoverageViewRowDto | null>(
    null
  );

  function clearFilters() {
    setFilter({});
    setSelectedRow(null);
  }

  useEffect(() => {
    getDashboard().then(setDashboard);
  }, []);

  if (!dashboard) {
    return <div>Loading...</div>;
  }

  const filteredRows = dashboard.coverageRows.filter((row) => {
    if (filter.status && row.coverageStatus !== filter.status) {
      return false;
    }

    if (filter.companyCode && row.companyCode !== filter.companyCode) {
      return false;
    }

    if (filter.category && row.category !== filter.category) {
      return false;
    }

    if (filter.frequency && row.frequency !== filter.frequency) {
      return false;
    }

    if (filter.searchText) {
      const search = filter.searchText.toLowerCase();

      const matches =
        row.companyCode?.toLowerCase().includes(search) ||
        row.accountItem?.toLowerCase().includes(search) ||
        row.category?.toLowerCase().includes(search) ||
        row.frequency?.toLowerCase().includes(search) ||
        row.reconType?.toLowerCase().includes(search) ||
        row.coverageStatus?.toLowerCase().includes(search);

      if (!matches) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Coverage Dashboard</h1>

        <Button
          variant="outlined"
          onClick={() => setDarkMode((current) => !current)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </Button>
      </div>

      <SummaryCards
        summary={dashboard.summary}
        onCoveragePercentageClick={clearFilters}
        onStatusClick={(status) => {
          setFilter({
            status: status,
          });
        }}
      />
      <Box sx={{ mb: 3 }}></Box>
      <GapChart
        title="Gap By Category"
        data={dashboard.summary.gapsByCategory}
        onBarClick={(category) => {
          setFilter((current) => ({
            ...current,
            status: "Gap",
            category,
          }));
        }}
      />
      <Box sx={{ mb: 3 }}></Box>
      <GapChart
        title="Gap By Company"
        data={dashboard.summary.gapsByCompany}
        onBarClick={(company) => {
          setFilter((current) => ({
            ...current,
            status: "Gap",
            companyCode: company,
          }));
        }}
      />
      <Box sx={{ mb: 3 }}></Box>
      <GapChart
        title="Gap By Frequency"
        data={dashboard.summary.gapsByFrequency}
        onBarClick={(frequency) => {
          setFilter((current) => ({
            ...current,
            status: "Gap",
            frequency,
          }));
        }}
      />
      <Box sx={{ mb: 3 }}></Box>
      <ActiveFilters filter={filter} onClear={() => setFilter({})} />

      <TextField
        fullWidth
        label="Search"
        value={filter.searchText ?? ""}
        onChange={(e) =>
          setFilter((current) => ({
            ...current,
            searchText: e.target.value,
          }))
        }
      />

      <div
        style={{
          marginBottom: "8px",
          color: "#666",
        }}
      >
        Showing {filteredRows.length.toLocaleString()} rows
      </div>
      <Box sx={{ mb: 3 }}></Box>
      <CoverageTable
        rows={filteredRows}
        selectedRow={selectedRow}
        onRowSelected={setSelectedRow}
      />

      <DetailsPanel row={selectedRow} />
    </>
  );
}

export default DashboardPage;
