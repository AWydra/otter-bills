import type { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Types } from 'mongoose';
import User from 'models/User';
import type { IRequest } from 'types/express';
import type { IDecodedToken, ILogInRequest, ISignUpRequest } from 'types/auth';
import type { IUserModel } from 'types/models';

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

export const signUp = async (req: ISignUpRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = (await User.create({ email, password })) as IDecodedToken;
    const token = createToken(user.id);
    res.cookie('jwt', token, { httpOnly: true });
    res.status(201).json({ user: user.id });
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
