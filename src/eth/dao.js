import web3 from './web3';
import Dao from './build/DAO.json';

const instance = new web3.eth.Contract(
  Dao.abi,
  '0x6BD3246353aC335507cBACdfF936a381F5c30a78'
);

export default instance;
