import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Flex,
  Button,
  Kbd,
  Container,
  Input,
  FormControl,
  FormLabel,
  Spinner,
} from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverCloseButton,
  Portal,
  PopoverFooter,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import dao from '../eth/dao';
import web3 from '../eth/web3';

const Header = (props) => {
  const [amount, setAmount] = useState('');
  const [metamaskUser, setMetamaskUser] = useState({});
  const [poolAmount, setPoolAmount] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);
  const [routeTo, setRouteTo] = useState('');

  useEffect(() => {
    fetchMetamaskUserDetails();
    fetchPoolAmount();
  }, []);

  async function fetchMetamaskUserDetails() {
    try {
      const accounts = await web3.eth.getAccounts();
      const isUser = await dao.methods.isAUser(accounts[0]).call();
      const isMember = await dao.methods.isAMember(accounts[0]).call();
      if (isUser) {
        const userProfileAddress = await dao.methods
          .metamaskAssociatedUser(accounts[0])
          .call();
        setRouteTo(userProfileAddress);
      }
      setMetamaskUser({
        isUser,
        isMember,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchPoolAmount() {
    try {
      const poolAmount = await dao.methods.getPoolAmount().call();
      setPoolAmount(poolAmount);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendToPool() {
    try {
      setButtonLoading(true);
      const accounts = await web3.eth.getAccounts();
      await dao.methods.addToPool().send({
        from: accounts[0],
        value: web3.utils.toWei(amount),
      });
    } catch (error) {
      console.log(error);
    }
    setButtonLoading(false);
    window.location.reload();
  }

  return (
    <Box padding={4} bg='gray.50' color='gray.800'>
      <Container maxW='container.xl'>
        <Flex as='nav' align='center' justify='space-between' wrap='wrap'>
          <Flex align='center' mr={5}>
            <Link to='/home'>
              <Heading as='h1' size='xl' letterSpacing={'tighter'}>
                Charity
                <Box as='span' color='teal.500'>
                  DAO
                </Box>
              </Heading>
            </Link>
          </Flex>

          {metamaskUser.isUser && (
            <Link to={`/user/${routeTo}`}>
              <Button colorScheme='teal'>Profile</Button>
            </Link>
          )}

          {metamaskUser.isMember && (
            <Flex align='center'>
              <Box mr={6}>
                <Heading as='h5' size='md'>
                  Pool Amount: {web3.utils.fromWei(poolAmount, 'ether')}{' '}
                  <Kbd>ether</Kbd>
                </Heading>
              </Box>

              <Popover>
                <Button
                  colorScheme='teal'
                  variant='solid'
                  isLoading={buttonLoading}
                >
                  <PopoverTrigger>
                    <AddIcon w={6} h={6} />
                  </PopoverTrigger>
                </Button>

                <Portal>
                  <PopoverContent>
                    <PopoverBody>
                      <FormControl>
                        <FormLabel>Amount</FormLabel>
                        <Input
                          type='number'
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </FormControl>
                      <Flex justifyContent='flex-end'>
                        <Button
                          colorScheme='red'
                          mt={3}
                          isLoading={buttonLoading}
                          loadingText='Processing'
                          onClick={sendToPool}
                        >
                          Transact
                        </Button>
                      </Flex>
                    </PopoverBody>
                    <PopoverFooter>
                      Please don't click anywhere until the transaction is
                      finished
                    </PopoverFooter>
                  </PopoverContent>
                </Portal>
              </Popover>
            </Flex>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
