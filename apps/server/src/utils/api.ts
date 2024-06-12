import type { IUserModel } from 'types/models';

export const returnUser = (user: IUserModel) => ({
  id: user.id,
  email: user.email,
});
