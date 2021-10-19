# ERC20Token Dapps
ERC20 Token build with Solidity, Truffle, and OpenZeppelin


## Download 
Download and unzip this Dapp into your local


## Initialize NPM 
```
cd ERC20Token-master
npm init --yes
```


## Install all devDependencies listed on package.json
```
cd ERC20Token-master
npm install --save-dev 
```
###### Install on Ubuntu
`sudo npm install --save-dev`

###### Verify Installation 
`npm list --depth 0 --save-dev`


## Install Truffle
https://www.trufflesuite.com/docs/truffle/getting-started/installation


## Change Truffle Configuration on truffle-config.js
```
const mnemonic = ""; // get mnemonic on from your Metamask Ethereum Wallet or other wallets
const InfuraApi = ""; // get the infura api https://infura.io/
```


## Migrate ( Deploy ) ERC20 Token Smart Contract into Rinkeby - Ethereum Test Network 
`truffle migrate --skip-dry-run --f 2 --to 2 --network rinkeby`



## Automation Testing Contract using Truffle Test
https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts

###### Compiling Contract 
`truffle compile` 

###### Run Truffle Test
`truffle test test/ERC20Token.test.js test/ERC20Token.test2.js --network ganache --compile-none`