import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Image,
  Text
} from '@chakra-ui/react';
import { BiSolidChevronRight } from 'react-icons/bi';
import { useAppSelector } from '../store';
import PostList from './PostList';
import BoardList from './BoardList';
import { Link, useParams } from 'react-router-dom';

export default function MainContent() {
  const currentBoard = useAppSelector((state) => state.nav.currentBoard);
  const authenticated = useAppSelector((state) => state.auth.authenticated);
  const { convoId } = useParams();
  const { boardId } = useParams();
  const currentConversation = useAppSelector(
    (state) => state.nav.currentConversation
  );
  return (
    <>
      <Box p={2}>
        {authenticated && (
          <>
            <Breadcrumb
              spacing="8px"
              separator={<BiSolidChevronRight color="var(--yellow)" />}
            >
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              {boardId && (
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to={currentBoard?.id?.toString()}>
                    {currentBoard?.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
              {convoId && (
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink as={Link} to={currentConversation?.id?.toString()}>
                    {currentConversation?.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </Breadcrumb>
            {convoId ? <PostList /> : <BoardList />}
          </>
        )}
        <HStack>
          <Image src="/dolph2duo.png" w={20} marginTop={5} />
          <Text>y'know, everybody's talkin' about buby...</Text>
        </HStack>
      </Box>
    </>
  );
}
