export interface IAxiosErrorData<T = string> {
  field?: T;
  message: string;
}

export interface ISignUpRequestData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface IUserResponseData {
  id: number;
  name: string;
  surname: string;
  email: string;
}

export interface ISignInRequestData {
  email: string;
  password: string;
}
