import { useEffect, useState } from "react";
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { getDashboard } from "../api/dashboardApi";
import type { CoverageDashboardDto, CoverageFilter, CoverageViewRowDto } from "../model/coverage";
import InvestigationSection from "../components/sections/InvestigationSection";
import ExecutiveSection from "../components/sections/ExecutiveSection";
import AnalysisSection from "../components/sections/AnalysisSection";
import DetailsSection from "../components/sections/DetailsSection";

type Props = { darkMode: boolean; setDarkMode: React.Dispatch<React.SetStateAction<boolean>> };

function DashboardPage({ darkMode, setDarkMode }: Props) {
  const [filter, setFilter] = useState<CoverageFilter>({});
  const [dashboard, setDashboard] = useState<CoverageDashboardDto | null>(null);
  const [selectedRow, setSelectedRow] = useState<CoverageViewRowDto | null>(null);

  function clearFilters() {
    setFilter({});
    setSelectedRow(null);
  }

  useEffect(() => { getDashboard().then(setDashboard); }, []);

  if (!dashboard) {
    return <Container maxWidth="xl" sx={{ py: 8 }}><Typography color="text.secondary">Loading dashboard…</Typography></Container>;
  }

  const filteredRows = dashboard.coverageRows.filter((row) => {
    if (filter.status && row.coverageStatus !== filter.status) return false;
    if (filter.companyCode && row.companyCode !== filter.companyCode) return false;
    if (filter.category && row.category !== filter.category) return false;
    if (filter.frequency && row.frequency !== filter.frequency) return false;
    if (filter.searchText) {
      const search = filter.searchText.toLowerCase();
      const matches = row.companyCode?.toLowerCase().includes(search) || row.accountItem?.toLowerCase().includes(search) || row.category?.toLowerCase().includes(search) || row.frequency?.toLowerCase().includes(search) || row.reconType?.toLowerCase().includes(search) || row.coverageStatus?.toLowerCase().includes(search);
      if (!matches) return false;
    }
    return true;
  });

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.paper" }}>
        <Toolbar disableGutters>
          <Container maxWidth="xl" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="overline" color="primary.main" sx={{ fontWeight: 800, letterSpacing: 1.5 }}>REDWOOD · OPERATIONS</Typography>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 750, letterSpacing: -0.5 }}>Coverage dashboard</Typography>
            </Box>
            <Button variant="outlined" size="small" startIcon={darkMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />} onClick={() => setDarkMode((current) => !current)}>
              {darkMode ? "Light mode" : "Dark mode"}
            </Button>
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack spacing={{ xs: 3, md: 4 }}>
          <Box>
            <Typography variant="h6" sx={{ mb: 0.5 }}>Executive overview</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Current coverage health and distribution across monitored processes.</Typography>
            <ExecutiveSection summary={dashboard.summary} onCoveragePercentageClick={clearFilters} onStatusClick={(status) => setFilter({ status })} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ mb: 0.5 }}>Gap analysis</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Explore where coverage gaps are concentrated. Select a chart item to filter the inventory.</Typography>
            <AnalysisSection summary={dashboard.summary}
              onCategoryClick={(category) => setFilter((current) => ({ ...current, status: "Gap", category }))}
              onCompanyClick={(companyCode) => setFilter((current) => ({ ...current, status: "Gap", companyCode }))}
              onFrequencyClick={(frequency) => setFilter((current) => ({ ...current, status: "Gap", frequency }))} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ mb: 0.5 }}>Coverage inventory</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Search and filter configured account coverage, then select a row to inspect its details.</Typography>
            <InvestigationSection filter={filter} rows={filteredRows} selectedRow={selectedRow} onFilterChange={setFilter} onClearFilters={clearFilters} onRowSelected={setSelectedRow} />
            <DetailsSection row={selectedRow} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default DashboardPage;
