import React, { useState, useEffect } from 'react';
import { Heading, Flex, Container, Spinner, Center } from '@chakra-ui/react';
import UserCard from '../components/UserCard';
import dao from '../eth/dao';
import user from '../eth/user';

const HomeScreen = ({ history }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetchUsers();
    window.ethereum.on('accountsChanged', function (accounts) {
      history.push('/');
      window.location.reload();
    });
  }, []);

  async function fetchUsers() {
    const userData = [];
    try {
      const userAddressArray = await dao.methods.getAllUsers().call();
      console.log(userAddressArray);
      const userContractInstances = await Promise.all(
        Array(userAddressArray.length)
          .fill()
          .map((element, index) => {
            return user(userAddressArray[index]);
          })
      );
      userContractInstances.forEach(async (instance, index) => {
        const name = await instance.methods.name().call();
        const description = await instance.methods.description().call();
        const isApproved = await instance.methods.isApproved().call();
        const isRejected = await instance.methods.isRejected().call();
        userData.push({
          name: name,
          description: description,
          isApproved: isApproved,
          isRejected: isRejected,
          routeTo: userAddressArray[index],
        });
      });
    } catch (error) {
      console.log(error);
    }
    setUsers(userData);
    setLoading(false);
  }

  return (
    <Container mt={7} maxW='container.xl'>
      <Heading as='h3' size='md' mb={7}>
        Users:
      </Heading>

      <Flex flexWrap='wrap'>
        {users.map((user, index) => {
          console.log(user.name);
          return (
            <UserCard
              key={index}
              name={user.name}
              description={user.description}
              approved={user.isApproved}
              rejected={user.isRejected}
            />
          );
        })}
      </Flex>
    </Container>
  );
};

export default HomeScreen;
