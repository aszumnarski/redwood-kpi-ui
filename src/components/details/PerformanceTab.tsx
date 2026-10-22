import { useEffect, useState } from "react";

import { getCoverageTrend, getGapTrend } from "../../api/performanceApi";

import type { TrendPointDto } from "../../model/performance";
import type { CoverageViewRowDto } from "../../model/coverage";

type Props = {
  row: CoverageViewRowDto | null;
};

export default function PerformanceTab({ row }: Props) {
  const [coverageTrend, setCoverageTrend] = useState<TrendPointDto[]>([]);

  const [gapTrend, setGapTrend] = useState<TrendPointDto[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setCoverageTrend(await getCoverageTrend());

    setGapTrend(await getGapTrend());
  }

  return (
    <div>
      <h3>Coverage Trend</h3>

      <ul>
        {coverageTrend.map((point) => (
          <li key={point.period}>
            {point.period}
            {" - "}
            {point.value}%
          </li>
        ))}
      </ul>

      <h3>Gap Trend</h3>

      <ul>
        {gapTrend.map((point) => (
          <li key={point.period}>
            {point.period}
            {" - "}
            {point.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
