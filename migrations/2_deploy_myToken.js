// Deploy MyToken Version 1
const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const MyToken = artifacts.require('MyToken');
module.exports = async function (deployer) {
    const instance = await deployProxy(MyToken, [], { deployer });
    console.log('Deployed', instance.address);
};