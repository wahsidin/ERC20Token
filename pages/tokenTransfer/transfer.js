import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Button , Form, Input, Message } from 'semantic-ui-react'
import ERC20TokenInstance from '../../ethereum/ERC20TokenInstance';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class TokenTransfer extends React.Component {

	state = {
		recepientAccountAddress: '',
		amount: '',
		errorMessage: '',
		loading: false
	};

	static async getInitialProps(props){

		const ERC20Token = await ERC20TokenInstance();
		/*
			OPEN METAMASK AND ASSIGN TO METAMASK CONNECTED ACCOUNT
		*/	
		const connectedAccountAddress = await window.ethereum.request({ method: 'eth_requestAccounts' });
		const connectedAccountBalance = await ERC20Token.methods.balanceOf( connectedAccountAddress[0] ).call();
		const tokenSymbol = await ERC20Token.methods.symbol().call();
		return{
				connectedAccountAddress: connectedAccountAddress,
	            connectedAccountBalance: connectedAccountBalance,
	        	ERC20Token : ERC20Token,
	        	tokenSymbol : tokenSymbol
	        	};
    }

	onSubmit = async (event) => {
		event.preventDefault();

		if( window.ethereum ){

			const { 
				recepientAccountAddress, 
				amount
			} = this.state;

			var TransactionHash = '';

			/*
				GET LIST OF METAMASK ACCOUNT
			*/
			// const accounts = await web3.eth.getAccounts();
			try{
				this.setState({ loading : true, errorMessage:'' });

				/*
					Calculate contract compatible value for transfer with proper decimal points using BigNumber
				*/
				const tokenDecimals = web3.utils.toBN(0);
				const tokenAmountToTransfer = web3.utils.toBN(amount);
				const calculatedTransferValue = web3.utils.toHex(tokenAmountToTransfer.mul(web3.utils.toBN(10).pow(tokenDecimals)));

				await this.props.ERC20Token.methods
				.transfer( recepientAccountAddress, calculatedTransferValue )
				.send({ 
					from: this.props.connectedAccountAddress[0],
					chainId: 4
				})
				.on('error', function(error){})
				.on('transactionHash', function(transactionHash){ 
					TransactionHash = transactionHash;
				})
				.on('receipt', function(receipt){
				   // console.log(receipt) // contains the new contract address
				})
				.on('confirmation', function(confirmationNumber, receipt){})
				.then(function(newContractInstance){
				    // console.log(newContractInstance) // instance with the new contract address
				});

				/*
					REFRESH TOKEN AMOUNT 
				*/
				const connectedAccountNewBalance = await this.props.ERC20Token.methods.balanceOf( this.props.connectedAccountAddress[0] ).call(); 
				document.getElementById("tokenAmount").innerHTML = connectedAccountNewBalance;

				/*
					SHOW TRANSACTION DETAILS LINK  
				*/
				var wrapperOpen = '<div id="txDetailsWrapper">';
				var paragraph = '<p id="transactionSuccessMessage" style="">Transfer <span class="amount">'+amount+'</span> Token to Address : <span class="amount">'+recepientAccountAddress+'</span> Success</p>';
				var aTag = 	'<a target="_blank" style="" id="transactionDetailsLink" href="https://rinkeby.etherscan.io/tx/'+TransactionHash+'">';
					aTag += 'Transaction Details : <span id="transactionHash">'+TransactionHash+'</span></a>'; 
				var wrapperClose = '</div>';
				document.getElementById("transferDetails").innerHTML = wrapperOpen + paragraph + aTag + wrapperClose; 

				// Router.pushRoute('/token/transfer');

			}catch(err){
				console.log(err.message);
				this.setState({errorMessage: err.message});
			}
			this.setState({ loading : false });			
		}
	}

	render() {
		return (
			<Layout>
				<div id="transferPageWrapper">
					 <div id="account-info">
						<h3>{this.props.connectedAccountAddress}</h3>
						<h4>
							<span id="tokenAmount">{this.props.connectedAccountBalance}</span> {this.props.tokenSymbol}
						</h4>
					</div>
					<h3>Transfer Token</h3>
					<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
						<Form.Field>
							<label>Recipient Account Address</label>
							<Input 
								label="Address" 
								labelPosition="right" 
								value={this.state.recepientAccountAddress}
								onChange={ event => this.setState({recepientAccountAddress : event.target.value}) }
							/>
							<label>Amount</label>
							<Input 
								label="Amount" 
								labelPosition="right" 
								value={this.state.amount}
								onChange={ event => this.setState({amount : event.target.value}) }
							/>
						</Form.Field>
						<Message error header="Oops!" content={this.state.errorMessage} />
						<Button loading={this.state.loading} primary>Transfer</Button>
						<div id="transferDetails"></div>
					</Form>	
				</div>
			</Layout>
		);
	}
}
export default TokenTransfer;