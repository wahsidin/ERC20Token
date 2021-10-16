const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;

function shouldBehaveLikeERC20Transfer (errorPrefix, from, to, balance) {

  	describe('when the recipient is not the zero address', function () {
		
		describe('when the sender does not have enough balance', function () {
			const amount = balance.addn(1);

			it('reverts', async function () {
				await expectRevert(
					this.token.transfer(to, amount),
					`${errorPrefix}: transfer amount exceeds balance`,
				);
			});
		});

		describe('when the sender transfers all balance', function () {
			const amount = new BN(balance);

			it('transfers the requested amount and emits a transfer event', async function () {
				const { logs } = await this.token.transfer(to, amount);
				expect(await this.token.balanceOf(from)).to.be.bignumber.equal('0');
				expect(await this.token.balanceOf(to)).to.be.bignumber.equal(amount);

				expectEvent.inLogs(logs, 'Transfer', {
					from,
					to,
					value: amount,
				});
			});
		});

		describe('when the sender transfers zero tokens', function () {
			const amount = new BN('0');

			it('transfers the requested amount and emits a transfer event', async function () {															
				const { logs } = await this.token.transfer(to, amount);
				expect(await this.token.balanceOf(from)).to.be.bignumber.equal("0");
				expect(await this.token.balanceOf(to)).to.be.bignumber.equal(balance);
				expectEvent.inLogs(logs, 'Transfer', {
					from,
					to,
					value: amount,
				});
			});
		});
  	});

	describe('when the recipient is the zero address', function () {
		it('reverts', async function () {
			await expectRevert(
				this.token.transfer(ZERO_ADDRESS, balance),
				`${errorPrefix}: transfer to the zero address`,
			);
		});
	});
}

module.exports = {
	shouldBehaveLikeERC20Transfer
};