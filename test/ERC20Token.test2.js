const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;
const ERC20Token = artifacts.require('ERC20Token');
const { shouldBehaveLikeERC20Transfer } = require('./shouldBehaveLikeERC20Transfer');


contract('ERC20', function (accounts) {
	
	// initialHolder 	: first account from provider ( or ganache ) 
	// recipient 		: second account from provider ( or ganache )
	// anotherAccount 	: third account from provider ( or ganache )
  	const [ initialHolder, recipient, anotherAccount ] = accounts;
  	const tokenName = 'MyERC20Token';
  	const tokenSymbol = 'MYTK';
  	const tokenInitialSupply = new BN(1000);
  
  	beforeEach(async function () {
    	this.token = await ERC20Token.deployed();
  	});

  	shouldBehaveLikeERC20Transfer('ERC20', initialHolder, recipient, tokenInitialSupply );
});	