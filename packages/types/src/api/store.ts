export interface IStore {
  id: number;
  name: string;
}

export interface IStoreResponseData {
  stores: IStore[];
}
