import {
  Divider,
  Button,
  Flex,
  Text,
  Skeleton,
  Spacer,
  Stack,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  InputGroup,
  InputLeftAddon,
  Tooltip,
  Heading
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../store';
import { IConversation, changeConversation } from '../store/slices/nav';
import ConversationCreator from './ConversationCreator';
import {
  deleteConversation,
  editConversation,
  getConversations
} from '../data/conversations';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ConversationList() {
  const isAdmin = useAppSelector((state) => state.auth.isAdmin);
  const userId = useAppSelector((state) => state.auth.userId);
  const authenticated = useAppSelector((state) => state.auth.authenticated);
  const token = useAppSelector((state) => state.auth.token);

  let { boardId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const toggleNewConvo = useAppSelector((state) => state.nav.newConvoToggle);
  const [conversationList, setConversationList] = useState<IConversation[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleConvoDelete = (convo: IConversation) => {
    toast.promise(
      deleteConversation(token, convo).then(() => fetchConversations()),
      {
        success: { title: 'Conversation deleted!', description: 'it is gone :o' },
        error: { title: 'Error!!', description: 'wait a bit and try again?' },
        loading: { title: 'Deleting conversation', description: 'please wait' }
      }
    );
  };

  useEffect(() => {
    fetchConversations();
  }, [authenticated, boardId, toggleNewConvo]);

  const fetchConversations = () => {
    if (!authenticated) return;
    const timeoutConversation = setTimeout(
      () => setIsLoadingConversations(true),
      200
    );
    getConversations(token, Number(boardId))
      .then((data) => setConversationList(data))
      .then(() => setErrorMessage(''))
      .catch((error) => setErrorMessage(error))
      .finally(() => {
        clearTimeout(timeoutConversation!);
        setIsLoadingConversations(false);
      });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editConversationId, setEditConversationId] = useState(0);

  const handleClose = () => {
    setIsEditing(false);
    setEditTitle('');
    setEditDescription('');
    setEditConversationId(0);
  };
  const handleEditWindow = (conversation: IConversation) => {
    setIsEditing(true);
    setEditTitle(conversation.name);
    setEditDescription(conversation.description);
    setEditConversationId(conversation.id);
  };
  const handleEdit = () => {
    toast.promise(
      editConversation(token, editConversationId, editTitle, editDescription)
        .then(() => {
          fetchConversations();
          handleClose();
        })
        .catch((error) => setErrorMessage(error)),
      {
        success: {
          title: 'Conversation edited!',
          description: 'a wave of the magic buby'
        },
        error: { title: 'Error!!', description: 'wait a bit and try again?' },
        loading: { title: 'Editing conversation', description: 'please wait' }
      }
    );
  };
  const handleConvoClick = (conversation: IConversation) => {
    navigate(`${conversation.id}`);
    dispatch(changeConversation(conversation));
  };
  return (
    <>
      <Stack direction="column">
        {isLoadingConversations ? (
          <Skeleton
            height="200px"
            isLoaded={!isLoadingConversations}
            fadeDuration={4}
            startColor="var(--red)"
            endColor="var(--yellow)"
          />
        ) : (
          <>
            <Text>Create New Conversation</Text>
            <Divider />
            <ConversationCreator />
            <Text>Conversations</Text>
            <Divider />
            {errorMessage && (
              <Heading color="var(--yellow)" fontSize="lg">
                Oh No!: {errorMessage}
              </Heading>
            )}
            {conversationList.map((conversation) => (
              <Flex>
                <Tooltip bg="var(--red)" label={conversation.description}>
                  <Button
                    w="100%"
                    bgColor="var(--darkerblue)"
                    onClick={() => handleConvoClick(conversation)}
                  >
                    {conversation.name}
                  </Button>
                </Tooltip>
                <Spacer />
                {(isAdmin || conversation.owner.id == userId) && (
                  <Button
                    marginLeft={2}
                    minW="100px"
                    onClick={() => handleEditWindow(conversation)}
                  >
                    Edit
                  </Button>
                )}
                {(isAdmin || conversation.owner.id == userId) && (
                  <Button
                    marginLeft={2}
                    minW="100px"
                    onClick={() => handleConvoDelete(conversation)}
                  >
                    delete
                  </Button>
                )}
              </Flex>
            ))}
          </>
        )}
      </Stack>
      <Modal isOpen={isEditing} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent bg="var(--darkblue)">
          <ModalHeader>Editing Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <InputLeftAddon minW="165px" bg="var(--darkerblue)">
                Conversation Name:
              </InputLeftAddon>
              <Input
                value={editTitle}
                type="text"
                placeholder="thinking about rocks"
                _placeholder={{ color: 'inherit' }}
                onChange={(e) => setEditTitle(e.target.value)}
                bg="var(--red)"
              ></Input>
            </InputGroup>
            <InputGroup>
              <InputLeftAddon minW="165px" bg="var(--darkerblue)">
                Description:
              </InputLeftAddon>
              <Input
                value={editDescription}
                type="text"
                placeholder="here is where we think about rocks"
                _placeholder={{ color: 'inherit' }}
                onChange={(e) => setEditDescription(e.target.value)}
                bg="var(--red)"
              ></Input>
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEdit}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
