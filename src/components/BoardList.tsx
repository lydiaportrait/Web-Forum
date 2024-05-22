import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Skeleton,
  Spacer,
  useToast,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { IBoard, changeBoard, resetBoard } from '../store/slices/nav';
import { useEffect, useState } from 'react';
import { deleteBoard, editBoard, getBoards } from '../data/boards';
import { useAppDispatch, useAppSelector } from '../store';
import BoardCreator from './BoardCreator';
import { Outlet, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function BoardList() {
  const authenticated = useAppSelector((state) => state.auth.authenticated);
  const isAdmin = useAppSelector((state) => state.auth.isAdmin);
  const token = useAppSelector((state) => state.auth.token);
  const toggleNewBoard = useAppSelector((state) => state.nav.newBoardToggle);

  const [boardList, setBoardList] = useState<IBoard[]>([]);
  const [isShowingConversations, setIsShowingConversations] = useState(false);
  const [isLoadingBoards, setIsLoadingBoards] = useState(false);
  const currentBoard = useAppSelector((state) => state.nav.currentBoard);

  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const toast = useToast();

  useEffect(() => {
    fetchBoards();
  }, [authenticated, toggleNewBoard]);
  useEffect(() => {
    setIsShowingConversations(true);
  }, [boardId]);

  const fetchBoards = () => {
    if (!authenticated) return;
    const timeoutBoard = setTimeout(() => setIsLoadingBoards(true), 100);
    getBoards(token)
      .then((data) => setBoardList(data))
      .then(() => setErrorMessage(''))
      .catch((error) => setErrorMessage(error))
      .finally(() => {
        clearTimeout(timeoutBoard!);
        setIsLoadingBoards(false);
      });
  };

  const handleAccordionClick = (board: IBoard) => {
    setIsShowingConversations(false);
    if (board == currentBoard) {
      dispatch(resetBoard());
      navigate(`/`);
    } else {
      dispatch(changeBoard(board));
      navigate(`/${board.id}`);
    }
  };

  const handleBoardDelete = (board: IBoard) => {
    toast.promise(
      deleteBoard(token, board).then(() => fetchBoards()),
      {
        success: { title: 'Board deleted!', description: 'it is gone :o' },
        error: { title: 'Error!!', description: 'wait a bit and try again?' },
        loading: { title: 'Deleting board', description: 'please wait' }
      }
    );
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editBoardId, setEditBoardId] = useState(0);

  const handleClose = () => {
    setIsEditing(false);
    setEditTitle('');
    setEditDescription('');
    setEditBoardId(0);
  };
  const handleEditWindow = (board: IBoard) => {
    setIsEditing(true);
    setEditTitle(board.name);
    setEditDescription(board.description);
    setEditBoardId(board.id);
  };
  const handleEdit = () => {
    toast.promise(
      editBoard(token, editBoardId, editTitle, editDescription)
        .then(() => {
          fetchBoards();
          handleClose();
        })
        .catch((error) => setErrorMessage(error)),
      {
        success: { title: 'Board edited!', description: 'a wave of the magic buby' },
        error: { title: 'Error!!', description: 'wait a bit and try again?' },
        loading: { title: 'Editing board', description: 'please wait' }
      }
    );
  };

  return (
    <Box>
      {isLoadingBoards ? (
        <Skeleton
          height="200px"
          isLoaded={!isLoadingBoards}
          fadeDuration={4}
          startColor="var(--red)"
          endColor="var(--yellow)"
        />
      ) : (
        <>
          {isAdmin && <BoardCreator />}
          {errorMessage && (
            <Heading color="var(--yellow)" fontSize="lg">
              Oh No!: {errorMessage}
            </Heading>
          )}
          <Accordion
            allowToggle
            index={boardList.findIndex((board) => board.id == Number(boardId))}
          >
            {boardList.map((board) => (
              <AccordionItem>
                <Flex p={2}>
                  <AccordionButton onClick={() => handleAccordionClick(board)}>
                    <Box minW="200px" as="span" flex="1" textAlign="left">
                      <Heading fontSize="2xl">{board.name}</Heading>
                    </Box>
                    <Text textAlign="left">{board.description}</Text>
                    <Spacer />
                    <AccordionIcon />
                  </AccordionButton>
                  <Spacer />
                  {isAdmin && (
                    <Button minW="100px" marginLeft={2} onClick={() => handleEditWindow(board)}>
                      edit
                    </Button>
                  )}
                  {isAdmin && (
                    <Button minW="100px" marginLeft={2} onClick={() => handleBoardDelete(board)}>
                      delete
                    </Button>
                  )}
                </Flex>
                <AccordionPanel pb={4}>
                  {isShowingConversations && <Outlet />}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
      <Modal isOpen={isEditing} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent bg="var(--darkblue)">
          <ModalHeader>Editing Board</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <InputLeftAddon minW="130px" bg="var(--darkerblue)">
                Board Name:
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
              <InputLeftAddon minW="130px" bg="var(--darkerblue)">
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
    </Box>
  );
}
