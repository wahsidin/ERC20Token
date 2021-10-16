const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;

function shouldBehaveLikeERC20 (errorPrefix, initialSupply, initialHolder, recipient, anotherAccount) {
	
	const tokenOwner = initialHolder;
	const spender = recipient;
	const to = anotherAccount;

	describe('total supply', function () {
		it('returns the total amount of tokens', async function () {
			expect(await this.token.totalSupply()).to.be.bignumber.equal(initialSupply);
		});
	});

	describe('balanceOf', function () {
		describe('when the requested account has no tokens', function () {
			it('returns zero', async function () {
				expect(await this.token.balanceOf(anotherAccount)).to.be.bignumber.equal('0');
			});
		});

		describe('when the requested account has some tokens', function () {
			it('returns the total amount of tokens', async function () {
				expect(await this.token.balanceOf(initialHolder)).to.be.bignumber.equal(initialSupply);
			});
		});
	});

	describe('transfer from', function () {
		describe('when the token owner is not the zero address', function () {
    
   	 		describe('when the recipient is not the zero address', function () {
				
				describe('when the spender has enough approved balance', function () {
					
			      	describe('when the token owner has enough balance', function () {
						const amountTransfer = new BN(100);;
						
						it('transfers the requested amount and decreases the spender allowance and emits a transfer event', 
							async function () {
							
							await this.token.approve(spender, amountTransfer, { from: tokenOwner });

							// transfers the requested amount
							const amount = amountTransfer;
							var balanceOfTokenOwner = initialSupply - amountTransfer;
							balanceOfTokenOwner = new BN(balanceOfTokenOwner);
							const { logs } = await this.token.transferFrom(tokenOwner, to, amountTransfer, { from: spender });
							expect(await this.token.balanceOf(tokenOwner)).to.be.bignumber.equal(balanceOfTokenOwner);
							expect(await this.token.balanceOf(to)).to.be.bignumber.equal(amount);

							// decreases the spender allowance
							expect(await this.token.allowance(tokenOwner, spender)).to.be.bignumber.equal('0');

							// emits a transfer event
							expectEvent.inLogs(logs, 'Transfer', {
								from: tokenOwner,
								to: to,
								value: amount,
							});
						});

						it('emits an approval event', async function () {
			  				const { logs } = await this.token.approve(spender, amountTransfer);

			              	expectEvent.inLogs(logs, 'Approval', {
			                	owner: tokenOwner,
			               	 	spender: spender,
			                	value: await this.token.allowance(tokenOwner, spender),
			              	});
						});
					});

					describe('when the token owner does not have enough balance', function () {
						const amount = initialSupply.addn(1); // 1000 + 1 = 1001  
				        it('reverts', async function () {
				          	await expectRevert(this.token.transferFrom(
				            	tokenOwner, to, amount), `${errorPrefix}: transfer amount exceeds balance`,
				          	);
				        });
					});
			  	});

			  	describe('when the spender does not have enough approved balance', function () {

		  			describe('when the token owner has enough balance', function () {
		    			
		    			it('reverts', async function () {

		    				/*
								token owner ( who deployed the contract )
								after all above test, then the balance has been reduced 
								so, the initialSupply not same again with balanceOf token owner 
					  			so, to make the test pass, 
					  			then the amount must get from token owner balance 
					  		*/
					  		/*
		    				const amount = initialSupply;
		    				await this.token.approve(spender, initialSupply.subn(1), { from: tokenOwner });
		    				*/
		  					
		  					const amount = await this.token.balanceOf(tokenOwner);
		    				await this.token.approve(spender, amount.subn(1), { from: tokenOwner });
		      				await expectRevert(this.token.transferFrom(
		        				tokenOwner, to, amount, { from: spender }), `${errorPrefix}: transfer amount exceeds allowance`,
		      				);
		   			 	});
		  			});

		  			describe('when the token owner does not have enough balance', function () {
		    			it('reverts', async function () {
		    				var amount = await this.token.balanceOf(tokenOwner);
		    				await this.token.approve(spender, amount, { from: tokenOwner });
		    				amount = amount.addn(1);

		      				await expectRevert(this.token.transferFrom(
		        				tokenOwner, to, amount, { from: spender }), `${errorPrefix}: transfer amount exceeds balance`,
		      				);
		    			});
		  			});
				});
			});	

			describe('when the recipient is the zero address', function () {
	        	const amount = initialSupply;
	        	const to = ZERO_ADDRESS;

	        	beforeEach(async function () {
	          		await this.token.approve(spender, amount, { from: tokenOwner });
	        	});

	        	it('reverts', async function () {
	          		await expectRevert(this.token.transferFrom(
	            		tokenOwner, to, amount, { from: spender }), `${errorPrefix}: transfer to the zero address`,
	          		);
	        	});
	     	});
		});	

		describe('when the token owner is the zero address', function () {
	      	const amount = 0;
	      	const tokenOwner = ZERO_ADDRESS;
	      	const to = recipient;

	      	it('reverts', async function () {
	        	await expectRevert(this.token.transferFrom(
	          		tokenOwner, to, amount, { from: spender }), `${errorPrefix}: transfer from the zero address`,
	        	);
	      	});
	   	});

	});	
}

module.exports = {
	shouldBehaveLikeERC20
};