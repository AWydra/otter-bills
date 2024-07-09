import type { IRequest } from './express';

export interface IGetHistoryRequest extends IRequest {
  query: {
    limit: string;
  };
}
