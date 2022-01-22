import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Button,
  Badge,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import web3 from '../eth/web3';

const Campaign = ({
  index,
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
  metamaskUserAddress,
  creatorAddress,
  approveCampaign,
  rejectCampaign,
  finalizeTransaction,
}) => {
  const [approveButtonLoading, setApproveButtonLoading] = useState(false);
  const [rejectButtonLoading, setRejectButtonLoading] = useState(false);
  const [transactButtonLoading, setTransactButtonLoading] = useState(false);

  return (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      p={4}
      mx={2}
      mb={4}
      width='400px'
      bg={transactionComplete && 'cyan.50'}
    >
      <Heading size='md'>
        {title}{' '}
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
              {totalMembers} Members
            </Badge>
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Flex flexDirection='column'>
            {!approved && !rejected && metamaskUserIsMember && (
              <Flex flexDirection='column'>
                <Button
                  leftIcon={<CheckIcon />}
                  colorScheme='green'
                  variant='solid'
                  isLoading={approveButtonLoading}
                  loadingText='Processing'
                  onClick={() =>
                    approveCampaign(index, setApproveButtonLoading)
                  }
                >
                  Approve
                </Button>
                <Button
                  leftIcon={<CloseIcon />}
                  colorScheme='red'
                  variant='outline'
                  px={6}
                  mt={2}
                  isLoading={rejectButtonLoading}
                  loadingText='Processing'
                  onClick={() => rejectCampaign(index, setRejectButtonLoading)}
                >
                  Reject
                </Button>
              </Flex>
            )}
            {approved &&
              metamaskUserAddress !== creatorAddress &&
              !transactionComplete && (
                <Alert status='success'>
                  <AlertIcon />
                  Campaign Approved
                </Alert>
              )}
            {rejected && (
              <Alert status='error'>
                <AlertIcon />
                Campaign Rejected
              </Alert>
            )}
            {!approved && !rejected && metamaskUserIsUser && (
              <Alert status='info'>
                <AlertIcon />
                Voting in Progress
              </Alert>
            )}
            {approved &&
              !transactionComplete &&
              metamaskUserIsUser &&
              metamaskUserAddress == creatorAddress && (
                <Button
                  colorScheme='red'
                  variant='solid'
                  px={6}
                  mt={5}
                  isLoading={transactButtonLoading}
                  loadingText='Processing'
                  onClick={() =>
                    finalizeTransaction(index, setTransactButtonLoading)
                  }
                >
                  Transact
                </Button>
              )}
            {transactionComplete && (
              <Alert status='success'>
                <AlertIcon />
                Transaction Completed
              </Alert>
            )}
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Campaign;
