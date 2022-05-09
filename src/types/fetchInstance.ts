type IFetchInstance = {
  fetchObject: IFetchData
  // redirect: boolean
}

type IFetchData = {
  response: Response;
  body: any;
  // type?: string
}

export type {
  IFetchInstance, IFetchData
}