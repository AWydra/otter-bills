import type { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { IDecodedToken } from 'types/auth';
import type { IRequest } from 'types/express';

export const requireAuth = (req: IRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      (err: jwt.VerifyErrors | null, decodedToken: jwt.JwtPayload | string | undefined) => {
        if (err) {
          res.status(401).json({ error: 'Auth error' });
        } else {
          req.userId = (decodedToken as IDecodedToken).id;
          next();
        }
      },
    );
  } else {
    res.status(401).json({ error: 'Auth error' });
  }
};
