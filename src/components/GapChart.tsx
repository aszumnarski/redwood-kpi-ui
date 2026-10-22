import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { DashboardBreakdownDto } from "../model/coverage";
import { useTheme } from "@mui/material/styles";

type Props = {
  title: string;
  data: DashboardBreakdownDto[];
  onBarClick?: (value: string) => void;
};

export default function GapChart({ title, data, onBarClick }: Props) {
  const theme = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <h3>{title}</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="key" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,

              border: `1px solid ${theme.palette.divider}`,
            }}
          />
          <Bar
            dataKey="count"
            fill={theme.palette.error.main}
            onClick={(data: any) => {
              const breakdown = data?.payload as DashboardBreakdownDto;

              if (breakdown) {
                onBarClick?.(breakdown.key);
              }
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
