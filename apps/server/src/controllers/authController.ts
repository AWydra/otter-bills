import type { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Types } from 'mongoose';
import * as yup from 'yup';
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
  const error = {
    field: '',
    message: '',
  };

  if (err.code === 11000) {
    error.field = 'email';
    error.message = 'Konto z podanym adresem email już istnieje';
  }

  if (err.message.includes('user validation failed')) {
    const dbError = Object.values(err.errors)[0];
    error.field = dbError.properties.path;
    error.message = dbError.properties.message;
  }

  return error;
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
          return res.status(400).json({ message: 'Invalid token' });
        }

        const user = await User.findById<IUserModel>((decodedToken as IDecodedToken).id);

        if (!user) {
          return res.status(400).json({ message: 'User not found' });
        }

        return res.status(200).json(returnUser(user));
      },
    );
  } else {
    res.status(400).json({ message: 'Invalid token' });
  }
};

export const signUpSchema = yup.object().shape({
  name: yup.string().required('Wymagane').min(3, 'Minimum 3 znaki'),
  surname: yup.string().required('Wymagane').min(3, 'Minimum 3 znaki'),
  email: yup.string().required('Wymagane').email('Niepoprawny email'),
  password: yup
    .string()
    .required('Wymagane')
    .min(8, 'Minimum 8 znaków')
    .max(30, 'Maksymalnie 30 znaków')
    .matches(/[0-9]/, 'Hasło musi zawierać cyfrę')
    .matches(/[a-z]/, 'Hasło musi zawierać małą literę')
    .matches(/[A-Z]/, 'Hasło musi zawierać dużą literę')
    .matches(/[^\w]/, 'Hasło musi zawierać znak specjalny'),
});

export const signUp = async (req: ISignUpRequest, res: Response) => {
  const { name, surname, email, password } = req.body;

  try {
    const user = (await User.create({ name, surname, email, password })) as IUserModel;
    const token = createToken(user.id);
    res.cookie('jwt', token, { httpOnly: true });
    res.status(201).json(returnUser(user));
  } catch (err: unknown) {
    const typedErr = err as IError;
    const error = handleErrors(typedErr);
    res.status(400).json(error);
  }
};

export const signIn = async (req: ILogInRequest, res: Response) => {
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
    res.status(400).json({ message: 'Błędne dane' });
    return;
  }
  res.status(400).json({ message: 'Błędne dane' });
};

export const signOut = (req: IRequest, res: Response) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'Wylogowano pomyślnie' });
};
