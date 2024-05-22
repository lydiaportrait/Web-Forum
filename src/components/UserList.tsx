import { Box, Flex, Skeleton, VStack, Text, Spacer, Divider } from "@chakra-ui/react";
import { useAppSelector } from "../store";
import { useEffect, useState } from "react";
import { getUsers } from "../data/users";
import { IUser } from "../store/slices/nav";

export default function UserList() {
    const token = useAppSelector((state) => state.auth.token);
    const authenticated = useAppSelector((state) => state.auth.authenticated);
    const [userList, setUserList] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        fetchUsers();
      }, []);
    
      const fetchUsers = () => {
        if (!authenticated) return;
        const timeout = setTimeout(() => setIsLoading(true), 100);
        getUsers(token)
          .then((data) => setUserList(data))
          .then(() => setErrorMessage(''))
          .catch((error) => setErrorMessage(error))
          .finally(() => {
            clearTimeout(timeout!);
            setIsLoading(false);
          });
      };
    return (
        <>
        {isLoading ? (
        <Skeleton
          height="200px"
          isLoaded={!isLoading}
          fadeDuration={4}
          startColor="var(--red)"
          endColor="var(--yellow)"
        />
        ) : (
          <VStack>
            {userList.map((user) => (
              <>
                <Divider orientation='horizontal' />
                <Flex w='100%'>
                  <Text>
                    {user.name}
                  </Text>
                  <Spacer />
                  <Text>
                    {user.description}
                  </Text>
                  <Spacer />
                  <Text>
                    BubyDay(tm):   
                    {user.dateCreated.split('T')[0]}
                  </Text>
                </Flex>
              </>
            ))}

          </VStack>
        )}
        </>
    );
  }