type IFetchInstance = {
  fetchObject: IFetchData
}

type IFetchData = {
  response: Response;
  body: any;
  type?: string
}

export type {
  IFetchInstance, IFetchData
}