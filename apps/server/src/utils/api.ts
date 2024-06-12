import * as yup from 'yup';
import type { IUserModel } from 'types/models';
import type { IUserResponseData } from '@repo/types';

export const returnUser = (user: IUserModel): IUserResponseData => ({
  id: String(user.id),
  name: user.name,
  surname: user.surname,
  email: user.email,
});

export const returnYupError = (error: unknown) => {
  if (error instanceof yup.ValidationError) {
    return {
      field: error.path,
      message: error.message,
    };
  }
};
