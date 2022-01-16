import React from 'react';
import { Box, Heading, Flex, Button, Kbd, Container } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const Header = (props) => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding={4}
      bg='gray.50'
      color='gray.800'
    >
      <Flex align='center' mr={5}>
        <Heading as='h1' size='xl' letterSpacing={'tighter'}>
          Charity DAO
        </Heading>
      </Flex>

      <Flex align='center'>
        <Box mr={6}>
          <Heading as='h5' size='md'>
            Wallet Balance: 0.002 <Kbd>ether</Kbd>
          </Heading>
        </Box>
        <Box mr={2}>
          <Button colorScheme='pink' variant='solid'>
            <AddIcon />
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
