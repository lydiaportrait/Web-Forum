import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme.js';
import { store } from './store/index';
import { Provider } from 'react-redux';
import Fonts from './components/Fonts.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ConversationList from './components/ConversationList.js';
import PostList from './components/PostList.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: ':boardId',
        element: <ConversationList />
      },
      {
        path: ':boardId/:convoId',
        element: <PostList />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Fonts />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
