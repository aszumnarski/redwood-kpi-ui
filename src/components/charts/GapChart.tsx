import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { DashboardBreakdownDto } from "../../model/coverage";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, Typography } from "@mui/material";

type Props = {
  title: string;
  data: DashboardBreakdownDto[];
  onBarClick?: (value: string) => void;
};

export default function GapChart({ title, data, onBarClick }: Props) {
  const theme = useTheme();

  return (
    <Card elevation={0} sx={{ height: "100%" }}>
      <CardContent sx={{ pb: 1 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{title}</Typography>

      <ResponsiveContainer width="100%" height={270}>
        <BarChart data={data}>
          <XAxis dataKey="key" stroke={theme.palette.text.secondary} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <YAxis stroke={theme.palette.text.secondary} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,

              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 8,
              boxShadow: theme.shadows[3],
            }}
          />
          <Bar
            dataKey="count"
            fill={theme.palette.error.main}
            radius={[4, 4, 0, 0]}
            onClick={(data: any) => {
              const breakdown = data?.payload as DashboardBreakdownDto;

              if (breakdown) {
                onBarClick?.(breakdown.key);
              }
            }}
          />
        </BarChart>
      </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
