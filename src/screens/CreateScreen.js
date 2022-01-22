import React, { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  Button,
  Kbd,
  Container,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from '@chakra-ui/react';
import user from '../eth/user';
import web3 from '../eth/web3';
import Header from '../components/Header';

const CampaignCreate = ({ history, location }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertShow, setAlertShow] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    if (
      title == '' ||
      description == '' ||
      name == '' ||
      phone == '' ||
      email == '' ||
      recipient == '' ||
      amount == ''
    ) {
      setAlertShow(true);
      return;
    }
    setLoading(true);
    try {
      console.log(location);
      const accounts = await web3.eth.getAccounts();
      const userInstance = user(location.state.previousUser);
      await userInstance.methods
        .createCampaign(
          title,
          description,
          name,
          phone,
          email,
          recipient,
          web3.utils.toWei(amount, 'ether')
        )
        .send({
          from: accounts[0],
        });
      setLoading(false);
      history.push(`/user/${location.state.previousUser}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      <Header />
      <Container maxW='container.xl' mt={7}>
        <Heading size='md'>Create Campaign</Heading>
        <Center p={50}>
          <Box
            p={10}
            pt={5}
            width='500px'
            borderRadius='lg'
            border='1px'
            borderColor='gray.100'
          >
            <form onSubmit={submitHandler}>
              <FormControl mt={5}>
                <FormLabel htmlFor='title'>Title</FormLabel>
                <Input
                  id='title'
                  type='text'
                  name='title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                <FormLabel htmlFor='phone'>Recipient Name</FormLabel>
                <Input
                  id='name'
                  type='text'
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={5}>
                <FormLabel htmlFor='phone'>Recipient Phone</FormLabel>
                <Input
                  id='phone'
                  type='number'
                  name='phone'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>
              <FormControl mt={5}>
                <FormLabel htmlFor='email'>Recipient Email</FormLabel>
                <Input
                  id='email'
                  type='text'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl mt={5}>
                <FormLabel htmlFor='recipient'>Recipient Public Key</FormLabel>
                <Input
                  id='recipient'
                  type='text'
                  name='recipient'
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </FormControl>
              <FormControl mt={5}>
                <FormLabel htmlFor='amount'>Amount</FormLabel>
                <Input
                  id='amount'
                  type='number'
                  name='amount'
                  width='80%'
                  mr={3}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <Kbd>ether</Kbd>
              </FormControl>
              <Flex justifyContent='space-between' mt={12}>
                <Button
                  colorScheme='teal'
                  variant='solid'
                  type='submit'
                  mr={4}
                  isLoading={loading}
                  loadingText='Processing'
                >
                  Submit
                </Button>
                {alertShow && (
                  <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle mr={2}>Fill all Fields</AlertTitle>
                    <CloseButton
                      position='absolute'
                      right='8px'
                      top='8px'
                      onClick={() => setAlertShow(false)}
                    />
                  </Alert>
                )}
              </Flex>
            </form>
          </Box>
        </Center>
      </Container>
    </>
  );
};

export default CampaignCreate;
