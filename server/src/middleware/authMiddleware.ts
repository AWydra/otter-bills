import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  // eslint-disable-next-line no-unused-vars
  interface Request {
    userId: string;
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decodedToken: any) => {
      if (err) {
        res.status(401).json({ error: 'Auth error' });
      } else {
        req.userId = decodedToken.id;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Auth error' });
  }
};
