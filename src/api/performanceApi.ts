import type { TrendPointDto } from "../model/performance";

export async function getCoverageTrend():
    Promise<TrendPointDto[]> {

    return [
        { period: "FY2026P06", value: 88 },
        { period: "FY2026P07", value: 89 },
        { period: "FY2026P08", value: 91 },
        { period: "FY2026P09", value: 93 },
        { period: "FY2026P10", value: 95 }
    ];
}

export async function getGapTrend():
    Promise<TrendPointDto[]> {

    return [
        { period: "FY2026P06", value: 329 },
        { period: "FY2026P07", value: 284 },
        { period: "FY2026P08", value: 231 },
        { period: "FY2026P09", value: 191 },
        { period: "FY2026P10", value: 146 }
    ];
}