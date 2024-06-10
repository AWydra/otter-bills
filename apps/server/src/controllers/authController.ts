import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from 'models/User';
import type { Types } from 'mongoose';

const handleErrors = (err: any) => {
  const errors = { email: '', password: '' };

  if (err.code === 11000) {
    errors.email = 'Konto z podanym adresem email już istnieje';
    return errors;
  }

  if (err.message.includes('user validation failed')) {
    // @ts-expect-error
    Object.values(err.errors).forEach(({ properties }) => {
      // @ts-expect-error
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const createToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!);
};

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user.id);
    res.cookie('jwt', token, { httpOnly: true });
    res.status(201).json({ user: user.id });
  } catch (err: any) {
    const error = handleErrors(err);
    res.status(400).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

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

export const logout = async (req: Request, res: Response) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'Logged out successfully' });
};
