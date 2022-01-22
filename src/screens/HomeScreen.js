import React, { useState, useEffect } from 'react';
import { Heading, Flex, Container, Spinner, Center } from '@chakra-ui/react';
import UserCard from '../components/UserCard';
import dao from '../eth/dao';
import user from '../eth/user';

const HomeScreen = ({ history }) => {
  const [userContracts, setUserContracts] = useState([]);
  const [userAddresses, setUserAddresses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchUserAddresses();
    fetchUsers();
    window.ethereum.on('accountsChanged', function (accounts) {
      history.push('/');
      window.location.reload();
    });
  }, []);

  async function fetchUserAddresses() {
    try {
      const userAddressArray = await dao.methods.getAllUsers().call();
      setUserAddresses(userAddressArray);
      const userContractInstances = await Promise.all(
        Array(userAddressArray.length)
          .fill()
          .map((element, index) => {
            return user(userAddressArray[index]);
          })
      );
      console.log(userContractInstances);
      setUserContracts(userContractInstances);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUsers() {
    try {
      const userData = [];
      console.log(userContracts);
      userContracts.forEach(async (instance, index) => {
        const name = await instance.methods.name().call();
        const description = await instance.methods.description().call();
        const creatorAddress = await instance.methods.userAddress().call();
        const isApproved = await instance.methods.isApproved().call();
        const isRejected = await instance.methods.isRejected().call();
        userData.push({
          name: name,
          description: description,
          isApproved: isApproved,
          isRejected: isRejected,
          routeTo: creatorAddress,
          userAddress: userAddresses[index],
        });
      });
    } catch (error) {
      console.log(error);
    }
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
