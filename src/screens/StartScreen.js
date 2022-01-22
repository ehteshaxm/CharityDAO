import React, { useState, useEffect } from 'react';
import {
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  Kbd,
  Box,
  Spinner,
} from '@chakra-ui/react';
import web3 from '../eth/web3';
import dao from '../eth/dao';

const StartScreen = ({ history }) => {
  const [startUser, setStartUser] = useState(false);
  const [startMember, setStartMember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  //Form States for User
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setLoading(true);
    start();
    window.ethereum.on('accountsChanged', function (accounts) {
      history.push('/');
      window.location.reload();
    });
  }, []);

  async function start() {
    const accounts = await web3.eth.getAccounts();
    // Check whether the current user is a User or a Member
    try {
      const isUser = await dao.methods.isAUser(accounts[0]).call();
      if (isUser) {
        history.push('/home');
      }
      const isMember = await dao.methods.isAMember(accounts[0]).call();
      if (isMember) {
        history.push('/home');
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function createUserHandler(e) {
    e.preventDefault();
    setButtonLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await dao.methods
        .createUser(name, description, address, phone, email)
        .send({
          from: accounts[0],
        });
    } catch (error) {
      console.log(error);
    }
    setButtonLoading(false);
    history.push('/home');
  }

  async function createMemberHandler() {
    setButtonLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await dao.methods.createMember().send({
        from: accounts[0],
        value: web3.utils.toWei('0.1'),
      });
    } catch (error) {
      console.log(error);
    }
    setButtonLoading(false);
    history.push('/home');
  }

  if (!startUser && !startMember) {
    return (
      <Flex
        justifyContent='center'
        align='center'
        width='350px'
        mx='auto'
        mt={300}
      >
        {loading ? (
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='teal.500'
            size='xl'
          />
        ) : (
          <Flex flexDirection='column' width='350px'>
            {' '}
            <Button
              colorScheme='teal'
              variant='solid'
              mb={3}
              onClick={() => setStartUser(true)}
            >
              Start as a User
            </Button>
            <Button
              colorScheme='teal'
              variant='solid'
              onClick={() => setStartMember(true)}
            >
              Start as a Member
            </Button>
          </Flex>
        )}
      </Flex>
    );
  } else if (!startUser) {
    return (
      <Box
        border='1px'
        borderColor='gray.100'
        width='350px'
        borderRadius='lg'
        display='flex'
        flexDirection='column'
        justifyContent='flex-end'
        p={5}
        mx='auto'
        mt={300}
      >
        <FormControl>
          <FormLabel htmlFor='email'>Become a DAO Member</FormLabel>
          <FormHelperText>
            DAO buy-in is 0.1 <Kbd>ether</Kbd> click on contribute to pay
          </FormHelperText>
        </FormControl>
        <Button
          variant='solid'
          colorScheme='teal'
          isLoading={buttonLoading}
          loadingText='Transaction Processing'
          mt={5}
          onClick={createMemberHandler}
        >
          Contribute
        </Button>
      </Box>
    );
  } else {
    return (
      <Box
        border='1px'
        borderColor='gray.100'
        width='450px'
        borderRadius='lg'
        display='flex'
        flexDirection='column'
        justifyContent='flex-end'
        p={5}
        mx='auto'
        mt={150}
      >
        <form onSubmit={createUserHandler}>
          <FormControl mt={5}>
            <FormLabel htmlFor='title'>Name</FormLabel>
            <Input
              id='name'
              type='text'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='description'>Description</FormLabel>
            <Textarea
              placeholder='Describe the Campaign'
              name='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='phone'>Address</FormLabel>
            <Input
              id='address'
              type='text'
              name='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='phone'>Phone</FormLabel>
            <Input
              id='phone'
              type='number'
              name='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>
          <FormControl mt={5}>
            <FormLabel htmlFor='email'>Email</FormLabel>
            <Input
              id='email'
              type='text'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Flex flexDirection='row-reverse' mt={5}>
            <Button
              colorScheme='teal'
              variant='solid'
              type='submit'
              isLoading={buttonLoading}
              loadingText='Processing'
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Box>
    );
  }
};

export default StartScreen;
