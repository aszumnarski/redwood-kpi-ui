import type { CoverageFilter } from "../../model/coverage";

type Props = {
    filter: CoverageFilter;
    onClear: () => void;
};

export default function ActiveFilters({
    filter,
    onClear
}: Props) {

    const entries = Object.entries(filter)
        .filter(([_, value]) => value);

    if (entries.length === 0) {
        return null;
    }

    return (
        <div
            style={{
                marginBottom: "16px",
                padding: "12px",
                background: "#f3f4f6",
                borderRadius: "8px"
            }}
        >
            <strong>Active Filters:</strong>

            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    marginTop: "8px"
                }}
            >
                {entries.map(([key, value]) => (
                    <span
                        key={key}
                        style={{
                            padding: "4px 10px",
                            background: "#2563eb",
                            color: "white",
                            borderRadius: "999px",
                            fontSize: "12px"
                        }}
                    >
                        {key}: {value}
                    </span>
                ))}
            </div>

            <button
                style={{
                    marginTop: "12px"
                }}
                onClick={onClear}
            >
                Clear Filters
            </button>
        </div>
    );
}