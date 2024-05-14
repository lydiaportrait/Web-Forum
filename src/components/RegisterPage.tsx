import {
  Box,
  Button,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useToast
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../store';
import { setRegistering } from '../store/slices/nav';
import { useState } from 'react';
import { postRegister } from '../data/login';

export default function RegisterPage() {
  const isRegistering = useAppSelector((state) => state.nav.isRegistering);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(setRegistering(false));
  };

  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordNameError, setPasswordNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleRegister = () => {
    const timeout = setTimeout(() => setIsLoading(true), 200);
    postRegister(userName, password, email)
      .then(() => dispatch(setRegistering(false)))
      .then(() => {
        toast({
          title: 'Account Created!',
          description: 'Buby has graced you with an account, time to get bubying',
          status: 'success',
          duration: 2000,
          isClosable: true
        });
      })
      .catch((error) => {
        if (error.Name != null) setUserNameError(error.Name[0]);
        else setUserNameError('');
        if (error.Password != null) setPasswordNameError(error.Password[0]);
        else setPasswordNameError('');
        if (error.Email != null) setEmailError(error.Email[0]);
        else setEmailError('');
      })
      .finally(() => {
        clearTimeout(timeout);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Modal isOpen={isRegistering!} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent bg="var(--darkblue)">
          <ModalHeader>Register an account on buby(tm)</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateColumns="repeat(3, 1fr)" w="400px" gap={1}>
              <FormLabel>Username:</FormLabel>
              <GridItem colSpan={2}>
                <Box>
                  <Input
                    value={userName}
                    type="text"
                    placeholder="buby the rambunctous"
                    _placeholder={{ color: 'inherit' }}
                    onChange={(e) => setUserName(e.target.value)}
                    bg="var(--red)"
                  ></Input>
                  <Text color="var(--yellow)" fontSize="sm">
                    {userNameError}
                  </Text>
                </Box>
              </GridItem>
              <FormLabel>Password:</FormLabel>
              <GridItem colSpan={2}>
                <Box>
                  <Input
                    value={password}
                    type={'password'}
                    placeholder="catzrule2024#^hehe<><"
                    _placeholder={{ color: 'inherit' }}
                    onChange={(e) => setPassword(e.target.value)}
                    bg="var(--red)"
                  ></Input>
                  <Text color="var(--yellow)" fontSize="sm">
                    {passwordNameError}
                  </Text>
                </Box>
              </GridItem>
              <FormLabel>Email:</FormLabel>
              <GridItem colSpan={2}>
                <Box>
                  <Input
                    value={email}
                    type={'email'}
                    placeholder="buby@bubymail.gov"
                    _placeholder={{ color: 'inherit' }}
                    onChange={(e) => setEmail(e.target.value)}
                    bg="var(--red)"
                  ></Input>
                  <Text color="var(--yellow)" fontSize="sm">
                    {emailError}
                  </Text>
                </Box>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            {isLoading && <Spinner />}
            <Button onClick={handleRegister}>Register!</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
