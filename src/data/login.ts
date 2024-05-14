import axios from 'axios';

export interface ILoginResponse {
  id: number;
  isAdmin: boolean;
  name: string;
  token: string;
}
export interface IRegisterResponse {
  id: number;
  name: string;
  email: string;
  dateCreated: string;
}

export function postLogin(userName: string, password: string) {
  return new Promise<ILoginResponse>((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_API_ENDPOINT}/api/Users/Login`, {
        name: userName,
        password
      })
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.status == 401) reject('Incorrect username/password :<');
        else reject('Server error :<');
      });
  });
}

export function postRegister(userName: string, password: string, email: string) {
  return new Promise<IRegisterResponse>((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_API_ENDPOINT}/api/Users`, {
        name: userName,
        password,
        email,
        description: ''
      })
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.status == 400) reject(error.response.data.errors);
        else reject('Server error :<');
      });
  });
}
