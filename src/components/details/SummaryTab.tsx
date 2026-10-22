import {
    Box,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    Stack,
    Typography,
  } from "@mui/material";
  
  import { useTheme } from "@mui/material/styles";
  
  import FolderOpenIcon from "@mui/icons-material/FolderOpen";
  import FactCheckIcon from "@mui/icons-material/FactCheck";
  import CheckCircleIcon from "@mui/icons-material/CheckCircle";
  import ErrorIcon from "@mui/icons-material/Error";
  import TrendingUpIcon from "@mui/icons-material/TrendingUp";
  import { getSummary } from "../../api/summaryApi";
  import type { SummaryMetricsDto } from "../../model/summary";
import type { CoverageViewRowDto } from "../../model/coverage";
import { useEffect, useState } from "react";
  
  type Props = {
    row: CoverageViewRowDto | null;
  };
  
  type MetricCardProps = {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    color?: string;
    progress?: number | null;
  };
  
  function MetricCard({
    title,
    value,
    icon,
    color,
    progress,
  }: MetricCardProps) {
    return (
      <Card
        elevation={0}
        sx={{
          height: "100%",
          border: 1,
          borderColor: "divider",
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1 }}
          >
            {icon}
  
            <Typography
              variant="caption"
              color="text.secondary"
            >
              {title}
            </Typography>
          </Stack>
  
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color,
            }}
          >
            {value}
          </Typography>
  
          {progress !== undefined &&
            progress !== null && (
              <LinearProgress
                variant="determinate"
                value={Math.max(
                  0,
                  Math.min(progress, 100)
                )}
                sx={{
                  mt: 2,
                  height: 8,
                  borderRadius: 4,
                }}
              />
            )}
        </CardContent>
      </Card>
    );
  }
  
  export default function SummaryTab({
    row,
  }: Props) {

    const theme = useTheme();
  
    const [summary, setSummary] =
    useState<SummaryMetricsDto | null>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (!row) {
      setSummary(null);
      return;
    }

    loadSummary();
  }, [row]);

  async function loadSummary() {
    if (!row) {
      return;
    }

    setLoading(true);
    try {
        const response =
          await getSummary(
            row.companyCode ?? "",
            row.accountItem ?? ""
          );
  
        setSummary(response);
      } finally {
        setLoading(false);
      }
    }
    

    if (!summary) {
      return (
        <Card
          elevation={0}
          sx={{
            border: 1,
            borderColor: "divider",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
            >
              Summary
            </Typography>
  
            <Typography color="text.secondary">
              Select a coverage row to display summary
              metrics.
            </Typography>
          </CardContent>
        </Card>
      );
    }
  
    return (
      <Box>
  
        <Typography
          variant="h6"
          sx={{ mb: 2 }}
        >
          Volumes
        </Typography>
  
        <Grid container spacing={2}>
  
          <Grid size={{ xs: 12, md: 3 }}>
            <MetricCard
              title="Open Items"
              value={summary.openItems?.toLocaleString() ?? "-"}
              icon={
                <FolderOpenIcon color="primary" />
              }
            />
          </Grid>
  
          <Grid size={{ xs: 12, md: 3 }}>
            <MetricCard
              title="Proposed"
              value={summary.proposedItems?.toLocaleString() ?? "-"}
              color={theme.palette.primary.main}
              icon={
                <FactCheckIcon color="primary" />
              }
            />
          </Grid>
  
          <Grid size={{ xs: 12, md: 3 }}>
            <MetricCard
              title="Cleared"
              value={summary.clearedItems?.toLocaleString() ?? "-"}
              color={theme.palette.success.main}
              icon={
                <CheckCircleIcon color="success" />
              }
            />
          </Grid>
  
          <Grid size={{ xs: 12, md: 3 }}>
            <MetricCard
              title="Errors"
              value={summary.errorItems?.toLocaleString() ?? "-"}
              color={theme.palette.error.main}
              icon={
                <ErrorIcon color="error" />
              }
            />
          </Grid>
  
        </Grid>
  
        <Typography
          variant="h6"
          sx={{
            mt: 4,
            mb: 2,
          }}
        >
          Effectiveness
        </Typography>
  
        <Grid container spacing={2}>
  
          <Grid size={{ xs: 12, md: 4 }}>
            <MetricCard
              title="Matching Rate"
              value={
                summary.matchingRate != null
                  ? `${summary.matchingRate.toFixed(1)}%`
                  : "-"
              }
              progress={summary.matchingRate}
              icon={
                <TrendingUpIcon color="primary" />
              }
            />
          </Grid>
  
          <Grid size={{ xs: 12, md: 4 }}>
            <MetricCard
              title="Matched → Cleared"
              value={
                summary.matchedClearedRate != null
                  ? `${summary.matchedClearedRate.toFixed(1)}%`
                  : "-"
              }
              progress={summary.matchedClearedRate}
              color={theme.palette.success.main}
              icon={
                <TrendingUpIcon color="success" />
              }
            />
          </Grid>
  
          <Grid size={{ xs: 12, md: 4 }}>
            <MetricCard
              title="Clearing Rate"
              value={
                summary.clearingRate != null
                  ? `${summary.clearingRate.toFixed(1)}%`
                  : "-"
              }
              progress={summary.clearingRate}
              icon={
                <TrendingUpIcon color="primary" />
              }
            />
          </Grid>
  
        </Grid>
  
      </Box>
    );
  }