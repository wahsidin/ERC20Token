/*
	1.	BASIC TEST
	2.	TOKEN SHOULD BEHAVE LIKE ERC20
	3.	TOKEN SHOULD BEHAVE LIKE ERC20 APPROVE
*/
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;
const ERC20Token = artifacts.require('ERC20Token');
const { shouldBehaveLikeERC20 } = require('./shouldBehaveLikeERC20');
const { shouldBehaveLikeERC20Approve } = require('./shouldBehaveLikeERC20Approve');

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

  	/*===============================================
		1.	BASIC TEST
	===============================================*/
  	it('has a name', async function () {
    	expect(await this.token.name()).to.equal(tokenName);
  	});

  	it('has a symbol', async function () {
   	 	expect(await this.token.symbol()).to.equal(tokenSymbol);
  	});

  	it('has 0 decimals', async function () {
    	expect(await this.token.decimals()).to.be.bignumber.equal('0');
  	});

  	/*===============================================
		2.	TOKEN SHOULD BEHAVE LIKE ERC20
	===============================================*/
	shouldBehaveLikeERC20('ERC20', tokenInitialSupply, initialHolder, recipient, anotherAccount);

	/*===============================================
		3.	TOKEN SHOULD BEHAVE LIKE ERC20 APPROVE
	===============================================*/
	shouldBehaveLikeERC20Approve('ERC20', initialHolder, recipient, tokenInitialSupply);

});	