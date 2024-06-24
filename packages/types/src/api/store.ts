export interface IStore {
  id: number;
  name: string;
}

export interface IStoreReponse {
  stores: IStore[];
}
