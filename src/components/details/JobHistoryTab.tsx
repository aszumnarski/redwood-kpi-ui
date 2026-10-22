import { useEffect, useState } from "react";

import type { CoverageViewRowDto } from "../../model/coverage";
import type { JobExecutionDto } from "../../model/jobHistory";

import { getJobHistory } from "../../api/jobHistoryApi";

type Props = {
    row: CoverageViewRowDto | null;
};

export default function JobHistoryTab({
    row
}: Props) {

    const [jobs, setJobs] =
        useState<JobExecutionDto[]>([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        if (!row) {
            return;
        }

        loadJobs();

    }, [row]);

    async function loadJobs() {

        if (!row) {
            return;
        }

        setLoading(true);

        const result =
            await getJobHistory(
                row.companyCode ?? "",
                row.accountItem ?? ""
            );

        setJobs(result);

        setLoading(false);
    }

    if (!row) {
        return <div>Select a row first</div>;
    }

    if (loading) {
        return <div>Loading job history...</div>;
    }

    return (
        <div>

            <h3>
                Job History
            </h3>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >
                <thead>
                    <tr>
                        <th>Job Id</th>
                        <th>Run Date</th>
                        <th>Schedule Date</th>
                        <th>Status</th>
                        <th>Error</th>
                        <th>Open</th>
                        <th>Proposed</th>
                        <th>Cleared</th>
                    </tr>
                </thead>

                <tbody>

                    {jobs.map(job => (

                        <tr key={job.jobId}>

                            <td>{job.jobId}</td>

                            <td>{job.runDate}</td>

                            <td>{job.scheduleDate}</td>

                            <td>{job.status}</td>

                            <td>
                                {job.errorDescription ?? "-"}
                            </td>

                            <td>{job.openItems}</td>

                            <td>{job.proposedItems}</td>

                            <td>{job.clearedItems}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}