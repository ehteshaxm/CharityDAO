import React from 'react';
import { Box, Heading, Flex, Button, Kbd, Container } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <Box padding={4} bg='gray.50' color='gray.800'>
      <Container maxW='container.xl'>
        <Flex as='nav' align='center' justify='space-between' wrap='wrap'>
          <Flex align='center' mr={5}>
            <Link to='/'>
              <Heading as='h1' size='xl' letterSpacing={'tighter'}>
                Charity
                <Box as='span' color='purple.500'>
                  DAO
                </Box>
              </Heading>
            </Link>
          </Flex>

          <Flex align='center'>
            <Box mr={6}>
              <Heading as='h5' size='md'>
                Token Value: 0.002 <Kbd>ether</Kbd>
              </Heading>
            </Box>
            <Box mr={2}>
              <Button colorScheme='purple' variant='solid'>
                <AddIcon />
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
