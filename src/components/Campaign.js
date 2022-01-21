import React from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Button,
  Badge,
  Flex,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import web3 from '../eth/web3';

const Campaign = ({
  title,
  description,
  name,
  phone,
  email,
  recipient,
  amount,
  totalMembers,
  approved,
  rejected,
  approveCount,
  rejectCount,
  transactionComplete,
  metamaskUserIsMember,
  metamaskUserIsUser,
}) => {
  return (
    <Box borderWidth='1px' borderRadius='lg' p={4} width='400px'>
      <Heading size='md'>
        {title}{' '}
        <Badge
          borderRadius='full'
          px='2'
          colorScheme={
            !approved && !rejected ? 'pink' : approved ? 'green' : 'red'
          }
        >
          {!approved && !rejected && 'Not Approved'}
          {approved && 'Approved'}
          {rejected && 'Rejected'}
        </Badge>
      </Heading>
      <Text mt={2} mb={4}>
        {description}
      </Text>
      <Grid templateColumns='repeat(4, 1fr)' gap={6}>
        <GridItem colSpan={2}>
          <Box>
            <Heading as='h5' size='sm' fontWeight='semibold'>
              Recipient Name:
            </Heading>
            {name}
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box>
            <Heading as='h5' size='sm' fontWeight='semibold'>
              Recipient Contact:
            </Heading>
            {phone}
            <Text>{email}</Text>
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box>
            <Heading as='h5' size='sm' fontWeight='semibold'>
              Recipient:
            </Heading>
            {recipient}
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box>
            <Heading as='h5' size='sm' fontWeight='semibold'>
              Amount:
            </Heading>
            {web3.utils.fromWei(amount, 'ether')}
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Box>
            <Heading as='h5' size='sm' fontWeight='semibold'>
              Status:
            </Heading>
            <Badge borderRadius='full' px='2' colorScheme='green' mr={1}>
              {approveCount} Approved
            </Badge>
            <Badge borderRadius='full' px='2' colorScheme='red' mr={1}>
              {rejectCount} Rejected
            </Badge>
            <Badge borderRadius='full' px='2' colorScheme='gray'>
              {totalMembers} Remaining
            </Badge>
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Flex flexDirection='column'>
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
            <Button colorScheme='red' variant='solid' px={6} mt={2}>
              Transact
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Campaign;
