import axios from 'axios';
import { IConversation } from '../store/slices/nav';

export function getConversations(
  token: string | undefined,
  boardId: number | undefined
) {
  return new Promise<IConversation[]>((resolve, reject) => {
    axios
      .get(
        `${import.meta.env.VITE_API_ENDPOINT}/api/Boards/${boardId}/Conversations`,
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

export function postConversation(
  token: string | undefined,
  boardId: number,
  name: string,
  description: string
) {
  return new Promise<IConversation>((resolve, reject) => {
    axios
      .post(
        `${import.meta.env.VITE_API_ENDPOINT}/api/Conversations`,
        {
          name,
          description,
          boardId
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

export function deleteConversation(token: string | undefined, convo: IConversation) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${import.meta.env.VITE_API_ENDPOINT}/api/Conversations/${convo.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export function editConversation(
  token: string | undefined,
  convoId: number,
  name: string,
  description: string
) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${import.meta.env.VITE_API_ENDPOINT}/api/Conversations/${convoId}`,
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
