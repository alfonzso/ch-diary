interface IFetchInstance {
  fetchObject: IFetchData
}

interface IFetchData {
  response: Response;
  body: any;
}

export type {
  IFetchInstance,
  IFetchData,
}