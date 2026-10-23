import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridFilterModel } from "@mui/x-data-grid";
import type { CoverageViewRowDto } from "../../model/coverage";
import StatusChip from "../StatusChip";

type Props = {
  rows: CoverageViewRowDto[];
  selectedRow: CoverageViewRowDto | null;
  onRowSelected: (row: CoverageViewRowDto) => void;
};

export default function CoverageTable({
  rows,
  selectedRow,
  onRowSelected,
}: Props) {
  const columns: GridColDef[] = [
    {
      field: "coverageStatus",
      headerName: "Status",
      width: 180,
    
      renderCell: (params) => (
        <StatusChip
          status={params.value}
        />
      )
    },
    {
      field: "companyCode",
      headerName: "Company",
      width: 120,
    },
    {
      field: "accountItem",
      headerName: "Account Item",
      width: 350,
    },
    {
      field: "category",
      headerName: "Category",
      width: 180,
    },
    {
      field: "frequency",
      headerName: "Frequency",
      width: 120,
    },
    {
      field: "reconType",
      headerName: "Recon Type",
      width: 120,
    },
    {
      field: "executionCount",
      headerName: "Executions",
      width: 120,
      type: "number",
    },
  ];

  const gridRows = rows.map((row, index) => ({
    id: index,
    ...row,
  }));

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={gridRows}
        columns={columns}

        disableColumnFilter
        disableColumnSelector
        disableDensitySelector

        hideFooterSelectedRowCount
        
        onRowClick={(params) => onRowSelected(params.row)}
        pageSizeOptions={[25, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
      />
    </div>
  );
}
