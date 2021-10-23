import web3 from './web3';
import ERC20Token from '../build/contracts/ERC20Token.json';

/*  
    1.  CREATE ERC20 TOKEN INSTANCE
*/
export default() => {
    return new web3.eth.Contract(
        ERC20Token.abi,
        "0xA56F8aAA405E9B3762E109E63B3E58c4bB6B769c"
    );
};