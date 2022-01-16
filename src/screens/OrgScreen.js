import React from 'react';
import {
  Flex,
  Image,
  Heading,
  Box,
  Badge,
  Container,
  Text,
  Grid,
  GridItem,
} from '@chakra-ui/react';

const OrgScreen = () => {
  return (
    <div>
      <Container maxW='container.xl' mt={7}>
        <Flex justifyContent='space-between'>
          <Image
            src='https://images2.boardingschoolreview.com/photo/1122x864/1000/593/img-academy-oqxuxY.jpg'
            width='600px'
            height='400px'
          />
          <Box padding={10}>
            <Heading>
              Orphan Foundation{' '}
              <Badge borderRadius='full' px='2' colorScheme='red'>
                Not Approved
              </Badge>
            </Heading>
            <Text mb={4}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
              error praesentium, facere rerum soluta expedita quod earum rem
              tempore asperiores!
            </Text>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
              <GridItem colSpan={2}>
                <Box>
                  <Heading as='h5' size='md' fontWeight='semibold'>
                    Owner:
                  </Heading>
                  0xd67E8127e5339fC482195c61d61Ccfb9D2a1166e
                </Box>
              </GridItem>
              <GridItem colSpan={2}>
                <Box>
                  <Heading as='h5' size='md' fontWeight='semibold'>
                    Address:
                  </Heading>
                  64/D, Tori Compound, Nigeria. Africa
                </Box>
              </GridItem>
              <GridItem colSpan={2}>
                <Box>
                  <Heading as='h5' size='md' fontWeight='semibold'>
                    Phone:
                  </Heading>
                  +91 9372173070
                </Box>
              </GridItem>
              <GridItem colSpan={2}>
                <Box>
                  <Heading as='h5' size='md' fontWeight='semibold'>
                    Status:
                  </Heading>
                  <Badge borderRadius='full' px='2' colorScheme='green' mr={1}>
                    5 Approved
                  </Badge>
                  <Badge borderRadius='full' px='2' colorScheme='red' mr={1}>
                    3 Rejected
                  </Badge>
                  <Badge borderRadius='full' px='2' colorScheme='gray'>
                    7 Remaining
                  </Badge>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Flex>
      </Container>
    </div>
  );
};

export default OrgScreen;
