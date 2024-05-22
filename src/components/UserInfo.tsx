import { Button, VStack, Text, Flex, Spacer, Box } from '@chakra-ui/react';
import { useAppSelector } from '../store';
import { useNavigate } from 'react-router-dom';

export default function UserInfo() {
  const name = useAppSelector((state) => state.auth.name);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/Users`);
  };
  return ( 
  <>
    <VStack align='right'>
      <Text>
      Hello, {name}, u are logged into Buby™ :o
      </Text>
      <Flex>
        <Spacer />
        <Button onClick={handleClick}>Users</Button>
      </Flex>
    </VStack>
  </>
  );
}
