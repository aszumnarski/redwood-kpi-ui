export interface DashboardBreakdownDto {
    key: string;
    count: number;
}

export interface DashboardSummaryDto {
    configuredCount: number;
    coveredCount: number;
    gapCount: number;
    coveragePercentage: number;

    coeCoveredCount: number;
    businessCoveredCount: number;
    plannedCount: number;

    unexpectedExecutionCount: number;
    totalExecutionCount: number;

    gapsByCategory: DashboardBreakdownDto[];
    gapsByCompany: DashboardBreakdownDto[];
    gapsByFrequency: DashboardBreakdownDto[];
}

export interface CoverageViewRowDto {
    companyCode: string | null;
    accountItem: string | null;
    category: string | null;
    accountType: string | null;
    frequency: string | null;
    reconType: string | null;
    coverageStatus: string;
    executionCount: number;
}

export interface CoverageDashboardDto {
    summary: DashboardSummaryDto;
    coverageRows: CoverageViewRowDto[];
}

export interface DashboardFilter {
    category?: string;
    companyCode?: string;
    frequency?: string;
    coverageStatus?: string;
}

export interface CoverageFilter {
    status?: string;
    companyCode?: string;
    category?: string;
    frequency?: string;
    searchText?: string;
}