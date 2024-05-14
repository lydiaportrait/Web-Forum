import {
  Flex,
  Input,
  Text,
  Button,
  useToast,
  VStack,
  Box,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react';
import { useState } from 'react';
import { postBoard } from '../data/boards';
import { useAppDispatch, useAppSelector } from '../store';
import { toggleNewBoard } from '../store/slices/nav';

export default function BoardCreator() {
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDesc, setNewBoardDesc] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleClick = () => {
    setErrorMessage('');
    toast.promise(
      postBoard(token, newBoardName, newBoardDesc)
        .then(() => {
          dispatch(toggleNewBoard());
          setNewBoardName('');
          setNewBoardDesc('');
        })
        .catch((error) => {
          if (error.Name != null) setErrorMessage(error.Name[0]);
          else if (error.Description != null) setErrorMessage(error.Description[0]);
        }),
      {
        success: {
          title: 'Board Created!',
          description: 'who knows what theyll use it for'
        },
        error: { title: 'Error!!', description: 'wait a bit and try again?' },
        loading: { title: 'Creating board', description: 'please wait' }
      }
    );
  };
  
  return (
    <Box p={2}>
      <Flex>
        <VStack w="100%">
          <InputGroup>
            <InputLeftAddon minW="130px" bg="var(--darkerblue)">
              Board Name:
            </InputLeftAddon>
            <Input
              value={newBoardName}
              type="text"
              placeholder="thinking about rocks"
              _placeholder={{ color: 'inherit' }}
              onChange={(e) => setNewBoardName(e.target.value)}
              bg="var(--red)"
            ></Input>
          </InputGroup>
          <InputGroup>
            <InputLeftAddon minW="130px" bg="var(--darkerblue)">
              Description:
            </InputLeftAddon>
            <Input
              value={newBoardDesc}
              type="text"
              placeholder="here is where we think about rocks"
              _placeholder={{ color: 'inherit' }}
              onChange={(e) => setNewBoardDesc(e.target.value)}
              bg="var(--red)"
            ></Input>
          </InputGroup>
        </VStack>
        <Button minW="130px" minH="90px" marginLeft={2} onClick={handleClick}>
          Create Board!
        </Button>
      </Flex>
      <Text color="var(--red)" fontSize="md">
        {errorMessage}
      </Text>
    </Box>
  );
}
