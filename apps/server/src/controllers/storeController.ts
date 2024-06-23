import sql from 'db';
import type { Response } from 'express';
import type { IRequest } from 'types/express';
import type { IStore } from 'types/stores';

export const getStores = async (req: IRequest, res: Response) => {
  const stores = await sql<IStore[]>`SELECT id, name FROM stores`;

  res.status(200).json({ stores });
};
