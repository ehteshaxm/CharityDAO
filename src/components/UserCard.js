import React from 'react';
import { Box, Heading, Image, Badge, Flex, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const OrgCard = ({ img }) => {
  return (
    <Box
      width='350px'
      height='430px'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      m={5}
    >
      <Image src={img} alt='person' width='100%' height='200px' />

      <Box p='6'>
        <Heading
          mt='1'
          fontWeight='semibold'
          as='h6'
          size='md'
          lineHeight='tight'
          isTruncated
        >
          Orphan Foundation
        </Heading>

        <Box>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet
          nihil tempore nam placeat veniam dolorem a tenetur cum quod
          recusandae.
        </Box>
        <Flex align='center' justifyContent='space-between' mt={4}>
          <Link to='/org'>
            <Button colorScheme='cyan' variant='outline'>
              View Organisation
            </Button>
          </Link>
          <Badge borderRadius='full' px='2' colorScheme='pink'>
            Not Approved
          </Badge>
        </Flex>
      </Box>
    </Box>
  );
};

export default OrgCard;
