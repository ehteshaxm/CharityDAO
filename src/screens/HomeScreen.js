import React from 'react';
import Header from '../components/Header';
import { Box, Heading, Flex, Button, Kbd, Container } from '@chakra-ui/react';
import OrgCard from '../components/UserCard';

const HomeScreen = () => {
  return (
    <div>
      <Container mt={7} maxW='container.xl'>
        <Heading as='h3' size='md' mb={7}>
          Organisations:
        </Heading>
        <Flex justifyContent='center' flexWrap='wrap'>
          <OrgCard img='https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE.jpg' />
          <OrgCard img='https://images2.boardingschoolreview.com/photo/1122x864/1000/593/img-academy-oqxuxY.jpg' />
          <OrgCard img='https://bit.ly/dan-abramov' />
          <OrgCard img='https://bit.ly/dan-abramov' />
          <OrgCard img='https://bit.ly/dan-abramov' />
          <OrgCard img='https://bit.ly/dan-abramov' />
        </Flex>
      </Container>
    </div>
  );
};

export default HomeScreen;
