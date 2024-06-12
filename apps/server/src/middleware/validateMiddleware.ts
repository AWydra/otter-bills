/* eslint-disable @typescript-eslint/no-explicit-any */

import type * as yup from 'yup';
import type { IRequest } from 'types/express';
import type { NextFunction, Response } from 'express';
import { returnYupError } from 'utils/api';

export const validate =
  (schema: yup.ObjectSchema<any>) => async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json(returnYupError(error));
    }

    next();
  };
