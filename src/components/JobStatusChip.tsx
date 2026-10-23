import Chip from "@mui/material/Chip";

type Props = {
  status: string;
};

export default function JobStatusChip({
  status,
}: Props) {

  const value = status.toLowerCase();

  if (value.includes("success")) {
    return (
      <Chip
        label={status}
        color="success"
        size="small"
      />
    );
  }

  if (value.includes("error")) {
    return (
      <Chip
        label={status}
        color="error"
        size="small"
      />
    );
  }

  if (value.includes("warning")) {
    return (
      <Chip
        label={status}
        color="warning"
        size="small"
      />
    );
  }

  if (value.includes("running")) {
    return (
      <Chip
        label={status}
        color="primary"
        size="small"
      />
    );
  }

  return (
    <Chip
      label={status}
      variant="outlined"
      size="small"
    />
  );
}