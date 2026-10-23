import { Card, CardContent, Stack, Typography, Box } from "@mui/material";

import { useTheme } from "@mui/material/styles";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import type { DashboardSummaryDto } from "../../model/coverage";

type Props = {
  summary: DashboardSummaryDto;
  selectedStatus?: string;
  onStatusClick?: (status: string) => void;
};

export default function CoverageDonut({ summary, onStatusClick }: Props) {
  const theme = useTheme();

  const data = [
    {
      name: "CoE Covered",
      value: summary.coeCoveredCount,
      color: theme.palette.success.main,
    },
    {
      name: "Business Covered",
      value: summary.businessCoveredCount,
      color: theme.palette.primary.main,
    },
    {
      name: "Planned",
      value: summary.plannedCount,
      color: theme.palette.warning.main,
    },
    {
      name: "Gap",
      value: summary.gapCount,
      color: theme.palette.error.main,
    },
    {
      name: "Unexpected Execution",
      value: summary.unexpectedExecutionCount,
      color: "#a855f7",
    },
  ];

  const total =
    summary.coeCoveredCount +
    summary.businessCoveredCount +
    summary.plannedCount +
    summary.gapCount +
    summary.unexpectedExecutionCount;

  return (
    <Card
      elevation={0}
      sx={{
        border: 1,
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Coverage Distribution
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Donut */}

          <Box
            sx={{
              width: 320,
              height: 320,
            }}
            role="img"
            aria-label={`Coverage percentage ${summary.coveragePercentage.toFixed(
              0
            )} percent`}
          >
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={85}
                  outerRadius={120}
                  onClick={(entry: any) => {
                    onStatusClick?.(entry.name);
                  }}
                >
                  {data.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value: number, name: string) => [
                    value.toLocaleString(),
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: theme.palette.background.paper,

                    border: `1px solid ${theme.palette.divider}`,

                    borderRadius: "8px",

                    color: theme.palette.text.primary,
                  }}
                />

                {/* Center Value */}

                <text
                  x="50%"
                  y="46%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: "42px",
                    fontWeight: 800,
                    fill: theme.palette.success.main,
                  }}
                >
                  {summary.coveragePercentage.toFixed(0)}%
                </text>

                <text
                  x="50%"
                  y="58%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: "14px",
                    letterSpacing: "1px",
                    fill: theme.palette.text.secondary,
                  }}
                >
                  COVERAGE
                </text>
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* Legend */}

          <Stack spacing={2}>
            {data.map((item) => {
              const percent = total === 0 ? 0 : (item.value * 100) / total;

              return (
                <Box
                  key={item.name}
                  onClick={() => onStatusClick?.(item.name)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    cursor: "pointer",
                    p: 1,
                    borderRadius: 1,

                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      backgroundColor: item.color,
                    }}
                  />

                  <Typography
                    sx={{
                      minWidth: 150,
                    }}
                  >
                    {item.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    {item.value.toLocaleString()}
                  </Typography>

                  <Typography color="text.secondary">
                    ({percent.toFixed(1)}%)
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
