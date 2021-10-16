const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;

function shouldBehaveLikeERC20Approve (errorPrefix, owner, spender, supply) {
  	
  	describe('when the spender is not the zero address', function () {
		
		describe('when the sender has enough balance', function () {
			 const amount = new BN(100);

			it('emits an approval event', async function () {
				
				const { logs } = await this.token.approve(spender, amount); 
				expectEvent.inLogs(logs, 'Approval', {
					owner: owner,
					spender: spender,
					value: amount,
				});
			});

			describe('when there was no approved amount before', function () {
				it('approves the requested amount', async function () {
					await this.token.approve(spender, amount); 
					expect(await this.token.allowance(owner, spender)).to.be.bignumber.equal(amount);
				});
			});

			describe('when the spender had an approved amount', function () {
				
				beforeEach(async function () {
					await this.token.approve(spender, new BN(1));
				});

				it('approves the requested amount and replaces the previous one', async function () {
					await this.token.approve(spender, amount);
					expect( await this.token.allowance(owner, spender)).to.be.bignumber.equal(amount);
				});
			});
		});

		describe('when the sender does not have enough balance', function () {
			const amount = supply.addn(1);

			it('emits an approval event', async function () {
				const { logs } = await this.token.approve(spender, amount);

				expectEvent.inLogs(logs, 'Approval', {
					owner: owner,
					spender: spender,
					value: amount,
				});
			});

			describe('when there was no approved amount before', function () {
				it('approves the requested amount', async function () {
					await this.token.approve(spender, amount); 
					expect(await this.token.allowance(owner, spender)).to.be.bignumber.equal(amount);
				});
			});

			describe('when the spender had an approved amount', function () {
				beforeEach(async function () {
					await this.token.approve(spender, new BN(1)); 
				});

				it('approves the requested amount and replaces the previous one', async function () {
					await this.token.approve(spender, amount); 
					expect(await this.token.allowance(owner, spender)).to.be.bignumber.equal(amount);
				});
			});
		});
  	});
}

module.exports = {
	shouldBehaveLikeERC20Approve
};