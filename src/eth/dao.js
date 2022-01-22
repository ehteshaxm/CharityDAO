import web3 from './web3';
import Dao from './build/DAO.json';

const instance = new web3.eth.Contract(
  Dao.abi,
  '0x3997D8602B34899c0F59f64C3be54555F1Ad3C22'
);

export default instance;
