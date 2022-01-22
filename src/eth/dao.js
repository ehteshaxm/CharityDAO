import web3 from './web3';
import Dao from './build/DAO.json';

const instance = new web3.eth.Contract(
  Dao.abi,
  '0x8dA1F23a168267A034417FF8A855CCb07c2BeD90'
);

export default instance;
