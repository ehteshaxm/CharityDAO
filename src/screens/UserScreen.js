import React, { useEffect, useState } from 'react';
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
  Spinner,
  Center,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import Campaign from '../components/Campaign';
import { Link } from 'react-router-dom';
import dao from '../eth/dao';
import user from '../eth/user';
import web3 from '../eth/web3';
import Header from '../components/Header';

const UserScreen = ({ history, match }) => {
  const [userDetails, setUserDetails] = useState({});
  const [metamaskUser, setMetamaskUser] = useState({});
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userApproveButtonLoading, setUserApproveButtonLoading] =
    useState(false);
  const [userRejectButtonLoading, setUserRejectButtonLoading] = useState(false);

  const routeUser = match.params.id;
  // const routeUser = '0x6200f5Ac82a2CcBA369925F11De05AE26B1E8684';
  // const routeUser = '0x57D5B1Ff46C5B3E21854459DCcb55A57E2A229A9';

  useEffect(() => {
    setLoading(true);
    fetchUserDetails();
    fetchMetamaskUserDetails();
    fetchCampaigns();
    window.ethereum.on('accountsChanged', function (accounts) {
      history.push('/');
      window.location.reload();
    });
  }, []);

  async function fetchUserDetails() {
    try {
      const userInstance = user(routeUser);
      const name = await userInstance.methods.name().call();
      const description = await userInstance.methods.description().call();
      const address = await userInstance.methods.locationAddress().call();
      const userAddress = await userInstance.methods.userAddress().call();
      const phone = await userInstance.methods.phone().call();
      const email = await userInstance.methods.email().call();
      const approveCount = await userInstance.methods.approveCount().call();
      const rejectCount = await userInstance.methods.rejectCount().call();
      const isApproved = await userInstance.methods.isApproved().call();
      const isRejected = await userInstance.methods.isRejected().call();

      const memberCount = await dao.methods.getMemberCount().call();

      setUserDetails({
        name,
        description,
        address,
        userAddress,
        phone,
        email,
        approveCount,
        rejectCount,
        approved: isApproved,
        rejected: isRejected,
        memberCount,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMetamaskUserDetails() {
    try {
      const accounts = await web3.eth.getAccounts();
      const userInstance = user(routeUser);
      const isUser = await dao.methods.isAUser(accounts[0]).call();
      const isMember = await dao.methods.isAMember(accounts[0]).call();
      const approvedUser = await userInstance.methods
        .approvedMembers(accounts[0])
        .call();
      const rejectedUser = await userInstance.methods
        .rejectedMembers(accounts[0])
        .call();
      setMetamaskUser({
        isUser,
        isMember,
        address: accounts[0],
        approvedUser,
        rejectedUser,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCampaigns() {
    try {
      const userInstance = user(routeUser);
      const numCampaign = await userInstance.methods.numCampaign().call();
      const campaigns = await Promise.all(
        Array(parseInt(numCampaign))
          .fill()
          .map((element, index) => {
            return userInstance.methods.campaigns(index).call();
          })
      );
      setAllCampaigns(campaigns);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function approveUserHandler() {
    try {
      setUserApproveButtonLoading(true);
      const userInstance = user(routeUser);
      const accounts = await web3.eth.getAccounts();
      console.log(userInstance);
      await userInstance.methods.approveUser().send({
        from: accounts[0],
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setUserApproveButtonLoading(false);
  }

  async function rejectUserHandler() {
    try {
      setUserRejectButtonLoading(true);
      const userInstance = user(routeUser);
      const accounts = await web3.eth.getAccounts();
      await userInstance.methods.rejectUser().send({
        from: accounts[0],
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setUserRejectButtonLoading(false);
  }

  async function approveCampaignHandler(index, setApproveButtonLoading) {
    try {
      setApproveButtonLoading(true);
      const userInstance = user(routeUser);
      const accounts = await web3.eth.getAccounts();
      await userInstance.methods.approveCampaign(index).send({
        from: accounts[0],
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setApproveButtonLoading(false);
  }

  async function rejectCampaignHandler(index, setRejectButtonLoading) {
    try {
      setRejectButtonLoading(true);
      const userInstance = user(routeUser);
      const accounts = await web3.eth.getAccounts();
      await userInstance.methods.rejectCampaign(index).send({
        from: accounts[0],
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setRejectButtonLoading(false);
  }

  async function finalizeTransaction(index, setTransactButtonLoading) {
    setTransactButtonLoading(true);
    try {
      const userInstance = user(routeUser);
      const accounts = await web3.eth.getAccounts();
      await userInstance.methods.finalizeTransaction(index).send({
        from: accounts[0],
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setTransactButtonLoading(false);
  }

  return (
    <div>
      <Header id={match.params.id} />
      {loading && (
        <Center height='500px'>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Center>
      )}
      {!loading && (
        <Container maxW='container.xl' mt={7} pb={50}>
          <Flex justifyContent='space-between' flexWrap='wrap'>
            <Box pt={5}>
              <Heading>
                {userDetails.name}{' '}
                <Badge
                  borderRadius='full'
                  px='2'
                  colorScheme={
                    !userDetails.approved && !userDetails.rejected
                      ? 'blue'
                      : userDetails.approved
                      ? 'green'
                      : 'red'
                  }
                >
                  {!userDetails.approved && !userDetails.rejected && 'Voting'}
                  {userDetails.approved && 'Approved'}
                  {userDetails.rejected && 'Rejected'}
                </Badge>
              </Heading>
              <Text mb={4}>{userDetails.description}</Text>
              <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                <GridItem colSpan={2}>
                  <Box>
                    <Heading as='h5' size='md' fontWeight='semibold'>
                      User Address:
                    </Heading>
                    {userDetails.userAddress}
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Box>
                    <Heading as='h5' size='md' fontWeight='semibold'>
                      Address:
                    </Heading>
                    {userDetails.address}
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Box>
                    <Heading as='h5' size='md' fontWeight='semibold'>
                      Contact:
                    </Heading>
                    {userDetails.phone}
                    <Text>{userDetails.email}</Text>
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Box>
                    <Heading as='h5' size='md' fontWeight='semibold'>
                      Status:
                    </Heading>
                    <Badge
                      borderRadius='full'
                      px='2'
                      colorScheme='green'
                      mr={1}
                    >
                      {userDetails.approveCount} Approved
                    </Badge>
                    <Badge borderRadius='full' px='2' colorScheme='red' mr={1}>
                      {userDetails.rejectCount} Rejected
                    </Badge>
                    <Badge borderRadius='full' px='2' colorScheme='gray'>
                      {userDetails.memberCount} Total Members
                    </Badge>
                  </Box>
                </GridItem>
              </Grid>
              <Box mt={10}>
                {metamaskUser.isMember &&
                  !userDetails.approved &&
                  !userDetails.rejected &&
                  !metamaskUser.approvedUser &&
                  !metamaskUser.rejectedUser && (
                    <>
                      <Button
                        leftIcon={<CheckIcon />}
                        colorScheme='green'
                        variant='solid'
                        mr={3}
                        isLoading={userApproveButtonLoading}
                        loadingText='Processing'
                        onClick={approveUserHandler}
                      >
                        Approve
                      </Button>
                      <Button
                        leftIcon={<CloseIcon />}
                        colorScheme='red'
                        variant='outline'
                        isLoading={userRejectButtonLoading}
                        loadingText='Processing'
                        onClick={rejectUserHandler}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                {userDetails.rejected && (
                  <Alert status='error'>
                    <AlertIcon />
                    {metamaskUser.isMember
                      ? 'User was Rejected'
                      : 'Profile has been Rejected'}
                  </Alert>
                )}
                {userDetails.approved && (
                  <Alert status='success'>
                    <AlertIcon />
                    {metamaskUser.isMember
                      ? 'User was Approved'
                      : 'Profile has been Approved'}
                  </Alert>
                )}
                {!userDetails.approved &&
                  !userDetails.rejected &&
                  metamaskUser.isUser && (
                    <Alert status='info'>
                      <AlertIcon />
                      <AlertTitle mr={2}>Please Wait</AlertTitle>
                      Voting in Progress
                    </Alert>
                  )}
                {metamaskUser.approvedUser &&
                  !userDetails.approved &&
                  !userDetails.rejected && (
                    <Alert status='info'>
                      <AlertIcon />
                      You Approved this User
                    </Alert>
                  )}
                {metamaskUser.rejectedUser &&
                  !userDetails.approved &&
                  !userDetails.rejected && (
                    <Alert status='info'>
                      <AlertIcon />
                      You Rejected this User
                    </Alert>
                  )}
              </Box>
            </Box>
          </Flex>
          <Box my={7}>
            <Flex align='center' justifyContent='space-between'>
              <Heading as='h5' size='lg'>
                Campaigns
              </Heading>
              {!metamaskUser.isMember && (
                <Link
                  to={{
                    pathname: '/create',
                    state: { previousUser: routeUser },
                  }}
                >
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme='teal'
                    variant='solid'
                    disabled={
                      !userDetails.approved ||
                      userDetails.userAddress != metamaskUser.address
                    }
                    history={history}
                  >
                    Create Campaign
                  </Button>
                </Link>
              )}
            </Flex>
            {!userDetails.approved && !userDetails.rejected && (
              <Alert status='error' mt={4}>
                <AlertIcon />
                <AlertTitle mr={2}>
                  {metamaskUser.isMember ? 'No Campaigns' : 'Not Approved'}
                </AlertTitle>
                {metamaskUser.isMember
                  ? 'User must be approved to be allowed to create campaigns'
                  : 'Must be approved by the DAO before creating campaigns'}
              </Alert>
            )}
          </Box>
          {userDetails.approved && (
            <Flex flexWrap='wrap'>
              {allCampaigns.map((campaign, index) => (
                <Campaign
                  key={index}
                  index={index}
                  title={campaign.title}
                  description={campaign.description}
                  name={campaign.recipientName}
                  phone={campaign.recipientPhone}
                  email={campaign.recipientEmail}
                  recipient={campaign.recipient}
                  amount={campaign.value}
                  approved={campaign.isApproved}
                  rejected={campaign.isRejected}
                  approveCount={campaign.approveCount}
                  rejectCount={campaign.rejectCount}
                  totalMembers={userDetails.memberCount}
                  transactionComplete={campaign.transactionComplete}
                  metamaskUserIsMember={metamaskUser.isMember}
                  metamaskUserIsUser={metamaskUser.isUser}
                  metamaskUserAddress={metamaskUser.address}
                  creatorAddress={userDetails.userAddress}
                  approveCampaign={approveCampaignHandler}
                  rejectCampaign={rejectCampaignHandler}
                  finalizeTransaction={finalizeTransaction}
                />
              ))}
            </Flex>
          )}
        </Container>
      )}
    </div>
  );
};

export default UserScreen;
