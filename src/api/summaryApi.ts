import type { SummaryMetricsDto } from "../model/summary";

export async function getSummary(
    companyCode: string,
    accountItem: string
): Promise<SummaryMetricsDto> {

    console.log(
        "Loading summary for",
        companyCode,
        accountItem
    );

    return {
        period: "FY2026P10",

        companyCode: "xxx",

        clearingType: "auto",

        accountItem: "xxxxxxx",

        openItems: 203300,

        proposedItems: 15836,

        clearedItems: 15836,

        errorItems: 0,

        matchingRate: 8,

        matchedClearedRate: 100,

        clearingRate: 8,

        finalized: false
    };
}