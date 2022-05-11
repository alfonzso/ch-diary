import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
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

export let chDiary = [
  {
    id: 1,
    date: '2022-05-06 02:37:18',
    // userId: 1,
    userName: "zsolt",
    // foodId: 1,
    foodName: "Rántott sertésborda, sült zöldség (light)",
    foodType: "D7",
    portion: 450,
    gramm: 100,
    kcal: 140,
    portein: 47 / 4.5,
    fat: 22 / 4.5,
    ch: 54 / 4.5
  },
  {
    id: 2,
    date: '2022-05-06 02:45:18',
    // userId: 1,
    userName: "zsolt",
    // foodId: 1,
    foodName: "Rántott csirke, sült zöldség (light)",
    foodType: "D8",
    portion: 450,
    gramm: 100,
    kcal: 100,
    portein: 40 / 4.5,
    fat: 20 / 4.5,
    ch: 50 / 4.5
  },
  {
    id: 3,
    date: '2022-05-06 03:33:33',
    // userId: 1,
    userName: "zsolt",
    // foodId: 1,
    foodName: "Rántott csigatalp, sült zöldség (light)",
    foodType: "D9",
    portion: 450,
    gramm: 100,
    kcal: 33,
    portein: 33 / 4.5,
    fat: 33 / 4.5,
    ch: 33 / 4.5
  },
]