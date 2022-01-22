import React, { useState, useEffect } from 'react';
import { Box, Heading, Badge, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const UserCard = ({ name, description, approved, rejected, routeTo }) => {
  return (
    <Box
      width='350px'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      m={5}
    >
      <Box p='6'>
        <Heading
          mt='1'
          fontWeight='semibold'
          as='h6'
          size='md'
          lineHeight='tight'
          isTruncated
        >
          {name}
        </Heading>

        <Box>{description}</Box>
        <Flex align='center' justifyContent='space-between' mt={4}>
          <Link to={`/user/${routeTo}`}>
            <Button colorScheme='cyan' variant='outline'>
              View User
            </Button>
          </Link>
          <Badge
            borderRadius='full'
            px='2'
            colorScheme={
              !approved && !rejected ? 'blue' : approved ? 'green' : 'red'
            }
          >
            {!approved && !rejected && 'Voting'}
            {approved && 'Approved'}
            {rejected && 'Rejected'}
          </Badge>
        </Flex>
      </Box>
    </Box>
  );
};

export default UserCard;
