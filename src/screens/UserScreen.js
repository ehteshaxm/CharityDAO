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
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import Campaign from '../components/Campaign';
import { Link } from 'react-router-dom';

const OrgScreen = () => {
  return (
    <div>
      <Container maxW='container.xl' mt={7} pb={50}>
        <Flex justifyContent='space-between'>
          <Image
            src='https://images2.boardingschoolreview.com/photo/1122x864/1000/593/img-academy-oqxuxY.jpg'
            width='600px'
            height='400px'
          />
          <Box padding={10} pt={5}>
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
                    3 Approved
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
            <Box mt={10}>
              <Button
                leftIcon={<CheckIcon />}
                colorScheme='green'
                variant='solid'
                mr={3}
              >
                Approve
              </Button>
              <Button
                leftIcon={<CloseIcon />}
                colorScheme='red'
                variant='outline'
              >
                Reject
              </Button>
              {/* <Alert status='error'>
                <AlertIcon />
                User was Rejected
              </Alert>
              <Alert status='success'>
                <AlertIcon />
                User has been Approved
              </Alert>
              <Alert status='info'>
                <AlertIcon />
                Voting in Progress
              </Alert> */}
            </Box>
          </Box>
        </Flex>
        <Box my={7}>
          <Flex align='center' justifyContent='space-between'>
            <Heading as='h5' size='lg'>
              Campaigns
            </Heading>
            <Link to='/create'>
              <Button
                leftIcon={<AddIcon />}
                colorScheme='purple'
                variant='solid'
              >
                Create Campaign
              </Button>
            </Link>
          </Flex>
          {/* <Alert status='error' mt={4}>
            <AlertIcon />
            <AlertTitle mr={2}>Not Approved</AlertTitle>
            You must be Approved by the DAO before creating campaigns
          </Alert> */}
        </Box>
        <Flex justifyContent='space-between' flexWrap='wrap'>
          <Campaign />
          <Campaign />
          <Campaign />
        </Flex>
      </Container>
    </div>
  );
};

export default OrgScreen;
