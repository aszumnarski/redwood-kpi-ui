import Chip from "@mui/material/Chip";

type Props = {
  status: string;
};

export default function StatusChip({
  status,
}: Props) {

  function getColor() {
    switch (status) {

      case "CoE Covered":
        return "success";

      case "Business Covered":
        return "primary";

      case "Planned":
        return "warning";

      case "Gap":
        return "error";

      case "Unexpected Execution":
        return "default";

      default:
        return "default";
    }
  }

  return (
    <Chip
      label={status}
      color={getColor()}
      size="small"
    />
  );
}