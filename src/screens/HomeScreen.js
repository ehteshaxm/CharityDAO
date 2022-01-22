import React, { useState, useEffect } from 'react';
import { Heading, Flex, Container, Spinner, Center } from '@chakra-ui/react';
import UserCard from '../components/UserCard';
import dao from '../eth/dao';
import user from '../eth/user';
import Header from '../components/Header';

const HomeScreen = ({ history }) => {
  const [userAddresses, setUserAddresses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserContracts();
    window.ethereum.on('accountsChanged', function (accounts) {
      history.push('/');
      window.location.reload();
    });
  }, []);

  async function fetchUserContracts() {
    try {
      setLoading(true);
      const userAddressArray = await dao.methods.getAllUsers().call();
      setUserAddresses(userAddressArray);
      const userContractInstances = await Promise.all(
        Array(userAddressArray.length)
          .fill()
          .map((element, index) => {
            return user(userAddressArray[index]);
          })
      );

      const userData = await Promise.all(
        Array(userContractInstances.length)
          .fill()
          .map(async (element, index) => {
            const name = await userContractInstances[index].methods
              .name()
              .call();
            const description = await userContractInstances[index].methods
              .description()
              .call();
            const creatorAddress = await userContractInstances[index].methods
              .userAddress()
              .call();
            const isApproved = await userContractInstances[index].methods
              .isApproved()
              .call();
            const isRejected = await userContractInstances[index].methods
              .isRejected()
              .call();
            return {
              name: name,
              description: description,
              isApproved: isApproved,
              isRejected: isRejected,
              routeTo: userAddressArray[index],
            };
          })
      );
      setUsers(userData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <Container mt={7} maxW='container.xl'>
        <Heading as='h3' size='md' mb={7}>
          Users:
        </Heading>

        {loading && (
          <Center height='500px'>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='teal.500'
              size='xl'
            />
          </Center>
        )}

        {!loading && (
          <Flex flexWrap='wrap' align='center'>
            {users.map((user, index) => {
              return (
                <UserCard
                  key={index}
                  name={user.name}
                  description={user.description}
                  approved={user.isApproved}
                  rejected={user.isRejected}
                  routeTo={user.routeTo}
                />
              );
            })}
          </Flex>
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
