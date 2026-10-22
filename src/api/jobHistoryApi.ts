import type { JobExecutionDto } from "../model/jobHistory";

export async function getJobHistory(
    companyCode: string,
    accountItem: string
): Promise<JobExecutionDto[]> {

    console.log(
        "Loading job history",
        companyCode,
        accountItem
    );

    return [
        {
            jobId: 3164143,
            runDate: "2026-10-01",
            scheduleDate: "2026-10-01",
            status: "Completed",
            errorDescription: null,
            openItems: 12000,
            proposedItems: 4200,
            clearedItems: 4000
        },
        {
            jobId: 3167895,
            runDate: "2026-10-08",
            scheduleDate: "2026-10-08",
            status: "Completed",
            errorDescription: null,
            openItems: 15000,
            proposedItems: 5100,
            clearedItems: 5000
        },
        {
            jobId: 3171122,
            runDate: "2026-10-15",
            scheduleDate: "2026-10-15",
            status: "Error",
            errorDescription: "File upload timeout",
            openItems: 14000,
            proposedItems: 0,
            clearedItems: 0
        }
    ];
}