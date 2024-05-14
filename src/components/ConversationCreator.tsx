import {
  Box,
  Button,
  Flex,
  Input,
  VStack,
  Text,
  useToast,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { postConversation } from '../data/conversations';
import { toggleNewConvo } from '../store/slices/nav';

export default function ConversationCreator() {
  const [newConvoName, setNewConvoName] = useState('');
  const [newConvoDesc, setNewConvoDesc] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const currentBoard = useAppSelector((state) => state.nav.currentBoard);
  
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const handleClick = () => {
    setErrorMessage('');
    toast.promise(
      postConversation(token, currentBoard?.id!, newConvoName, newConvoDesc)
        .then(() => {
          dispatch(toggleNewConvo());
          setNewConvoName('');
          setNewConvoDesc('');
        })
        .catch((error) => {
          if (error.Name != null) setErrorMessage(error.Name[0]);
          else if (error.Description != null) setErrorMessage(error.Description[0]);
        }),
      {
        success: {
          title: 'Conversation Created!',
          description: 'time 2 get down to bubying'
        },
        error: { title: 'Error!!', description: 'wait a bit and try again?' },
        loading: { title: 'Creating conversation', description: 'please wait' }
      }
    );
  };
  return (
    <Box p={2}>
      <Flex>
        <VStack w="100%">
          <InputGroup>
            <InputLeftAddon minW="165px" bg="var(--darkerblue)">
              Conversation Name:
            </InputLeftAddon>
            <Input
              value={newConvoName}
              type="text"
              placeholder="thinking about rocks"
              _placeholder={{ color: 'inherit' }}
              onChange={(e) => setNewConvoName(e.target.value)}
              bg="var(--red)"
            ></Input>
          </InputGroup>
          <InputGroup>
            <InputLeftAddon minW="165px" bg="var(--darkerblue)">
              Description:
            </InputLeftAddon>
            <Input
              value={newConvoDesc}
              type="text"
              placeholder="here is where we think about rocks"
              _placeholder={{ color: 'inherit' }}
              onChange={(e) => setNewConvoDesc(e.target.value)}
              bg="var(--red)"
            ></Input>
          </InputGroup>
        </VStack>
        <Button
          minW="130px"
          minH="90px"
          whiteSpace="normal"
          height="auto"
          blockSize="auto"
          marginLeft={2}
          onClick={handleClick}
        >
          <Text>Create Conversation!</Text>
        </Button>
      </Flex>
      <Text color="var(--red)" fontSize="md">
        {errorMessage}
      </Text>
    </Box>
  );
}
