export interface JobExecutionDto {
    jobId: number;

    runDate: string;

    scheduleDate: string;

    status: string;

    errorDescription: string | null;

    openItems: number;

    proposedItems: number;

    clearedItems: number;
}