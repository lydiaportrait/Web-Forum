import axios from 'axios';
import { IUser } from '../store/slices/nav';

export function getUsers(token: string | undefined) {
    return new Promise<IUser[]>((resolve, reject) => {
      axios
        .get(`${import.meta.env.VITE_API_ENDPOINT}/api/Users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => resolve(response.data))
        .catch(() => reject('server error :<'));
    });
  }