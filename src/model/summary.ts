export interface SummaryMetricsDto {
    period: string;

    companyCode: string;

    clearingType: string;

    accountItem: string;

    openItems: number;

    proposedItems: number;

    clearedItems: number;

    errorItems: number;

    matchingRate: number;

    matchedClearedRate: number;

    clearingRate: number;

    finalized: boolean;
}