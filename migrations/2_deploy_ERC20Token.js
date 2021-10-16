// Deploy MyToken Version 1
const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const ERC20Token = artifacts.require('ERC20Token');
module.exports = async function (deployer, network, accounts) {

    const instance = await deployProxy(ERC20Token, [], { deployer, initializer: "initialize" });
    console.log('Deployed', instance.address);
};