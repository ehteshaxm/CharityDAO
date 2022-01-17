import React from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Button,
  Badge,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

const Campaign = () => {
  return (
    <Box borderWidth='1px' borderRadius='lg' p={4} width='400px'>
      <Heading size='md'>
        School Books{' '}
        <Badge borderRadius='full' px='2' colorScheme='green'>
          Approved
        </Badge>
      </Heading>
      <Text mt={2} mb={4}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic error
        impedit eligendi? Possimus eaque eius eveniet voluptatum voluptates
        reprehenderit cumque.
      </Text>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        <GridItem colSpan={2}>
          <Box>
            <Heading as='h5' size='sm' fontWeight='semibold'>
              Recipient Name:
            </Heading>
            Sheila
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box>
            <Heading as='h5' size='sm' fontWeight='semibold'>
              Recipient Contact:
            </Heading>
            +91 9372173070
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box>
            <Heading as='h5' size='sm' fontWeight='semibold'>
              Recipient:
            </Heading>
            0xd67E8127e5339fC482195c61d61Ccfb9D2a1166e
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box>
            <Heading as='h5' size='sm' fontWeight='semibold'>
              Amount:
            </Heading>
            0.002 Ether/Approver
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box>
            <Heading as='h5' size='sm' fontWeight='semibold'>
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
        <GridItem colSpan={2}>
          <Box>
            <Button
              leftIcon={<CheckIcon />}
              colorScheme='green'
              variant='solid'
            >
              Approve
            </Button>
            <Button
              leftIcon={<CloseIcon />}
              colorScheme='red'
              variant='outline'
              px={6}
              mt={2}
            >
              Reject
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Campaign;
