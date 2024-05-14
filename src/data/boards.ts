import axios from 'axios';
import { IBoard } from '../store/slices/nav';

export function getBoards(token: string | undefined) {
  return new Promise<IBoard[]>((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT}/api/Boards`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => resolve(response.data))
      .catch(() => reject('server error :<'));
  });
}

export function postBoard(
  token: string | undefined,
  name: string,
  description: string
) {
  return new Promise<IBoard>((resolve, reject) => {
    axios
      .post(
        `${import.meta.env.VITE_API_ENDPOINT}/api/Boards`,
        {
          name,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (error.response.status == 400) reject(error.response.data.errors);
        else reject('Server error :<');
      });
  });
}

export function deleteBoard(token: string | undefined, board: IBoard) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${import.meta.env.VITE_API_ENDPOINT}/api/Boards/${board.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export function editBoard(
  token: string | undefined,
  boardId: number,
  name: string,
  description: string
) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${import.meta.env.VITE_API_ENDPOINT}/api/Boards/${boardId}`,
        {
          name,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => resolve(response.data))
      .catch(() => reject('server error :<'));
  });
}
