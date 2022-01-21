import web3 from './web3';
import User from './build/User.json';

const user = (address) => {
  return new web3.eth.Contract(User.abi, address);
};

export default user;
