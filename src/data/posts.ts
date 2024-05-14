import axios from 'axios';
import { IConversation, IPost } from '../store/slices/nav';

export function getPosts(
  token: string | undefined,
  conversationId: number | undefined
) {
  return new Promise<IPost[]>((resolve, reject) => {
    axios
      .get(
        `${import.meta.env.VITE_API_ENDPOINT}/api/Conversations/${conversationId}/Posts`,
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

export function deletePost(token: string | undefined, postId: number | undefined) {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${import.meta.env.VITE_API_ENDPOINT}/api/Posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}
export function postPost(
  token: string | undefined,
  conversationId: number | undefined,
  content: string | undefined
) {
  return new Promise<IConversation[]>((resolve, reject) => {
    axios
      .post(
        `${import.meta.env.VITE_API_ENDPOINT}/api/Posts`,
        {
          conversationID: conversationId,
          content
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

export function editPost(token: string | undefined, postId: number, content: string) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${import.meta.env.VITE_API_ENDPOINT}/api/Posts/${postId}`,
        {
          content
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
