import type { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Types } from 'mongoose';
import User from 'models/User';
import type { IRequest } from 'types/express';
import type { IDecodedToken, ILogInRequest, ISignUpRequest } from 'types/auth';
import type { IUserModel } from 'types/models';
import { returnUser } from 'utils/api';

interface IError {
  code: number;
  message: string;
  errors: Record<string, { path: string; message: string }>[];
}

const handleErrors = (err: IError) => {
  const errors: Record<string, string> = {};

  if (err.code === 11000) {
    errors.email = 'Konto z podanym adresem email już istnieje';
    return errors;
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const createToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!);
};

export const checkCredentials = (req: IRequest, res: Response) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      async (err: jwt.VerifyErrors | null, decodedToken: jwt.JwtPayload | string | undefined) => {
        if (err) {
          return res.status(400).json({ error: 'Invalid token' });
        }

        const user = await User.findById<IUserModel>((decodedToken as IDecodedToken).id);

        if (!user) {
          return res.status(400).json({ error: 'User not found' });
        }

        return res.status(200).json(returnUser(user));
      },
    );
  } else {
    res.status(400).json({ error: 'Invalid token' });
  }
};

export const signUp = async (req: ISignUpRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = (await User.create({ email, password })) as IUserModel;
    const token = createToken(user.id);
    res.cookie('jwt', token, { httpOnly: true });
    res.status(201).json(returnUser(user));
  } catch (err: unknown) {
    const typedErr = err as IError;
    const error = handleErrors(typedErr);
    res.status(400).json({ error });
  }
};

export const logIn = async (req: ILogInRequest, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne<IUserModel>({ email });

  if (user && password) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      const token = createToken(user.id);
      res.cookie('jwt', token, { httpOnly: true });
      res.status(200).json({ user: user.id });
      return;
    }
    res.status(400).json({ error: 'Błędne dane' });
    return;
  }
  res.status(400).json({ error: 'Błędne dane' });
};

export const logOut = (req: IRequest, res: Response) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'Logged out successfully' });
};
