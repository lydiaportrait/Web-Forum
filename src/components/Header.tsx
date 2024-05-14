import { Box, Flex, Heading, Spacer } from '@chakra-ui/react';
import LoginForm from './LoginForm';
import UserInfo from './UserInfo';
import { useAppSelector } from '../store';

export default function Header() {
  const authenticated = useAppSelector((state) => state.auth.authenticated);
  return (
    <Flex alignItems="center" p="2">
      <Box>
        <Heading size="md">Buby™ the forum</Heading>
      </Box>
      <Spacer />
      <Box>{authenticated ? <UserInfo /> : <LoginForm />}</Box>
    </Flex>
  );
}
