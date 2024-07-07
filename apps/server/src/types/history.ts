import type { IGetLatestHistoryRequestData } from '@repo/types';
import type { IRequest } from './express';

export interface IGetLatestHistoryRequest extends IRequest {
  body: IGetLatestHistoryRequestData;
}
