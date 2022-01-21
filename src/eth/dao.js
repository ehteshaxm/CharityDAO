import web3 from './web3';
import Dao from './build/DAO.json';

const instance = new web3.eth.Contract(
  Dao.abi,
  '0x93b097745DfF1a6279A552dCAaE32034DAB1A57d'
);

export default instance;
