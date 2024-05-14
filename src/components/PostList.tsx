import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Skeleton,
  Spacer,
  Textarea,
  useToast,
  Text,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../store';
import { IPost } from '../store/slices/nav';
import { useEffect, useState } from 'react';
import { deletePost, editPost, getPosts, postPost } from '../data/posts';

export default function PostList() {
  const isAdmin = useAppSelector((state) => state.auth.isAdmin);
  const userId = useAppSelector((state) => state.auth.userId);
  const token = useAppSelector((state) => state.auth.token);

  const currentConversation = useAppSelector(
    (state) => state.nav.currentConversation
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [postList, setPostList] = useState<IPost[]>([]);

  const [content, setContent] = useState('');
  const toast = useToast();

  const fetchPosts = () => {
    const timeout = setTimeout(() => setIsLoading(true), 100);
    getPosts(token, currentConversation?.id)
      .then((data) => setPostList(data))
      .then(() => setErrorMessage(''))
      .catch((error) => setErrorMessage(error))
      .finally(() => {
        clearTimeout(timeout!);
        setIsLoading(false);
      });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [editPostId, setEditPostId] = useState(0);

  const handleClick = () => {
    postList.push({
      id: 0,
      owner: {
        id: userId!,
        isAdmin: false,
        name: 'you',
        description: '',
        dateCreated: ''
      },
      content
    });
    postPost(token, currentConversation?.id, content).then(fetchPosts);
    setContent('');
  };
  const handleDelete = (post: IPost) => {
    toast.promise(
      deletePost(token, post.id).then(() => fetchPosts()),
      {
        success: { title: 'Post deleted!', description: 'it is gone :o' },
        error: { title: 'Error!!', description: 'wait a bit and try again?' },
        loading: { title: 'Deleting post', description: 'please wait' }
      }
    );
  };

  const handleClose = () => {
    setIsEditing(false);
    setEditContent('');
    setEditPostId(0);
  };
  
  const handleEditWindow = (post: IPost) => {
    setIsEditing(true);
    setEditContent(post.content);
    setEditPostId(post.id);
  };

  const handleEdit = () => {
    toast.promise(
      editPost(token, editPostId, editContent)
        .then(() => {
          fetchPosts();
          handleClose();
        })
        .catch((error) => setErrorMessage(error)),
      {
        success: { title: 'Post edited!', description: 'a wave of the magic buby' },
        error: { title: 'Error!!', description: 'wait a bit and try again?' },
        loading: { title: 'Editing post', description: 'please wait' }
      }
    );
  };
  
  useEffect(fetchPosts, [currentConversation]);

  return (
    <>
      {isLoading ? (
        <Skeleton
          height="400px"
          isLoaded={!isLoading}
          fadeDuration={1}
          startColor="var(--red)"
          endColor="var(--yellow)"
        />
      ) : (
        <>
          <Flex p={2}>
            <VStack align="left">
              {errorMessage && (
                <Heading color="var(--yellow)" fontSize="lg">
                  Oh No!: {errorMessage}
                </Heading>
              )}
              <Heading color="var(--yellow)" fontSize="lg">
                {currentConversation?.name}
              </Heading>
              <Text color="var(--yellow)">{currentConversation?.description}</Text>
            </VStack>
          </Flex>
          <Box>
            {postList.map((post) => (
              <>
                <Box p={1}>
                  <Divider />
                  <Flex paddingTop={2}>
                    <Text color="var(--yellow)">{post.owner.name}:</Text>
                    {post.content}
                    <Spacer />
                    <VStack>
                      {(isAdmin || post.owner.id == userId) && (
                        <Button
                          marginLeft={2}
                          minW="100px"
                          onClick={() => handleEditWindow(post)}
                        >
                          Edit
                        </Button>
                      )}
                      {(isAdmin || post.owner.id == userId) && (
                        <Button
                          marginLeft={2}
                          minW="100px"
                          onClick={() => handleDelete(post)}
                        >
                          Delete
                        </Button>
                      )}
                    </VStack>
                  </Flex>
                </Box>
              </>
            ))}
          </Box>
          <Flex>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              h="80px"
            ></Textarea>
            <Button
              bgColor="var(--red)"
              onClick={handleClick}
              h="80px"
              display="block"
              w="60"
              marginLeft={2}
            >
              Post
            </Button>
          </Flex>
        </>
      )}
      <Modal isOpen={isEditing} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent bg="var(--darkblue)">
          <ModalHeader>Editing Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              h="80px"
            ></Textarea>
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
