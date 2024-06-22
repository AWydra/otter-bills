import type { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import type { IRequest } from 'types/express';
import type { IDecodedToken, ILogInRequest, ISignUpRequest } from 'types/auth';
import type { IUserModel } from 'types/models';
import { returnUser } from 'utils/api';
import sql from 'db';
import type { PostgresError } from 'postgres';

const createToken = (id: number) => {
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

        const [user]: [IUserModel?] =
          await sql`SELECT * FROM users WHERE id = ${(decodedToken as IDecodedToken).id}`;

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
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user]: [IUserModel] = await sql`
      INSERT INTO users (name, surname, email, password) 
      VALUES (${name}, ${surname}, ${email}, ${hashedPassword})
      returning id, name, surname, email`;

    const token = createToken(user.id);
    res.cookie('jwt', token, { httpOnly: true });
    res.status(201).json(returnUser(user));
  } catch (err: unknown) {
    const typedError = err as PostgresError;
    typedError.code === '23505'
      ? res.status(400).json({ field: 'email', message: 'Użytkownik już istnieje' })
      : res.status(500).json({ message: 'Błąd serwera' });
  }
};

export const signInSchema = yup.object().shape({
  email: yup.string().required('Wymagane').min(3, 'Minimum 3 znaki'),
  password: yup
    .string()
    .required('Wymagane')
    .min(8, 'Minimum 8 znaków')
    .max(30, 'Maksymalnie 30 znaków'),
});

export const signIn = async (req: ILogInRequest, res: Response) => {
  const { email, password } = req.body;

  const [user]: [IUserModel?] = await sql`SELECT * FROM users WHERE email = ${email}`;

  if (user && password) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      const token = createToken(user.id);
      res.cookie('jwt', token, { httpOnly: true });
      res.status(200).json(returnUser(user));
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
