import { useState } from 'react';
import { postLogin } from '../data/login';
import { login } from '../store/slices/auth';
import { setRegistering } from '../store/slices/nav';
import { useAppDispatch, useAppSelector } from '../store';
import { Button, Grid, Input, Spacer, Spinner, Text } from '@chakra-ui/react';
import RegisterPage from './RegisterPage';

export default function LoginForm() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isRegistering = useAppSelector((state) => state.nav.isRegistering);
  const dispatch = useAppDispatch();
  
  function doToggleRegister() {
    dispatch(setRegistering(!isRegistering));
  }

  function doLogin() {
    if (isLoading) return;
    setIsLoading(true);
    postLogin(userName, password)
      .then((data) =>
        dispatch(
          login({
            name: data.name,
            isAdmin: data.isAdmin,
            id: data.id,
            token: data.token
          })
        )
      )
      .catch((message) => setErrorMessage(message))
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Spacer />
          <Grid templateColumns="repeat(3, 1fr)" w="400px" gap={1}>
            <Text>Username:</Text>
            <Input
              value={userName}
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              bg="var(--red)"
            ></Input>
            <Button onClick={doToggleRegister}>Register</Button>
            <Text>Password:</Text>
            <Input
              value={password}
              type={'password'}
              onChange={(e) => setPassword(e.target.value)}
              bg="var(--red)"
            ></Input>
            <Button onClick={doLogin}>Login</Button>
          </Grid>
          <p>{errorMessage}</p>
          {isRegistering && <RegisterPage />}
        </>
      )}
    </>
  );
}
