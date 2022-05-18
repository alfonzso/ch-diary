import { GridColDef } from "@mui/x-data-grid";

export const chDiarySchema: GridColDef[] = [
  // { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'date',
    headerName: 'Date',
    // width: 90,
    flex: 1
  },
  // { field: 'userName', headerName: 'User name', width: 130 },
  {
    field: 'foodName',
    headerName: 'Food name',
    // width: 130
    flex: 1
  },
  {
    field: 'foodType',
    headerName: 'type',
    // width: 50
    flex: 1
  },
  {
    field: 'portion',
    // headerName: 'Food portion',
    type: 'number',
    // width: 70,
    flex: 1
  },
  {
    field: 'gramm',
    type: 'number',
    // width: 90,
    flex: 1
  },
  {
    field: 'kcal',
    type: 'number',
    // width: 90,
    flex: 1
  },
  {
    field: 'portein',
    type: 'number',
    // width: 90,
    flex: 1
  },
  {
    field: 'fat',
    type: 'number',
    // width: 90,
    flex: 1
  },
  {
    field: 'ch',
    type: 'number',
    // width: 90,
    flex: 1

  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];
