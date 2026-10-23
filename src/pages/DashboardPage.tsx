import { useEffect, useState } from "react";

import { getDashboard } from "../api/dashboardApi";

import type {
  CoverageDashboardDto,
  CoverageFilter,
  CoverageViewRowDto,
} from "../model/coverage";

import SummaryCards from "../components/summary/SummaryCards";

import GapChart from "../components/charts/GapChart";
import CoverageDistributionChart from "../components/charts/CoverageDistributionChart";
import DetailsPanel from "../components/details/DetailsPanel";

import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import InvestigationSection from "../components/sections/InvestigationSection";
import ExecutiveSection from "../components/sections/ExecutiveSection";
import AnalysisSection from "../components/sections/AnalysisSection";
import DetailsSection from "../components/sections/DetailsSection";

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

      <ExecutiveSection
        summary={dashboard.summary}
        onCoveragePercentageClick={clearFilters}
        onStatusClick={(status) => {
          setFilter({
            status,
          });
        }}
      />

      <Box sx={{ mb: 3 }}></Box>
      <AnalysisSection
        summary={dashboard.summary}
        onCategoryClick={(category) => {
          setFilter((current) => ({
            ...current,
            status: "Gap",
            category,
          }));
        }}
        onCompanyClick={(companyCode) => {
          setFilter((current) => ({
            ...current,
            status: "Gap",
            companyCode,
          }));
        }}
        onFrequencyClick={(frequency) => {
          setFilter((current) => ({
            ...current,
            status: "Gap",
            frequency,
          }));
        }}
      />
      <Box sx={{ mb: 3 }}></Box>
      <InvestigationSection
        filter={filter}
        rows={filteredRows}
        selectedRow={selectedRow}
        onFilterChange={setFilter}
        onClearFilters={clearFilters}
        onRowSelected={setSelectedRow}
      />

      <DetailsSection row={selectedRow} />
    </>
  );
}

export default DashboardPage;
