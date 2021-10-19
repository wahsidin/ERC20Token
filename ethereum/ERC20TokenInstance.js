import web3 from './web3';
import ERC20Token from '../build/contracts/ERC20Token.json';

/*  
    1.  CREATE ERC20 TOKEN INSTANCE
*/
export default() => {
    return new web3.eth.Contract(
        ERC20Token.abi,
        "0x80b3c9686d03b0516E40DC430814C17dF3e5BC63"
    );
};