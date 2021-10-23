import Web3 from 'web3';

/*
    1.  IMPORT LIBRARY ( MODULES )
    2.  CREATE INSTANCE OF WEB3
*/

/*================================
    1.  USING MODULES 
================================*/
const HDWalletProvider = require("@truffle/hdwallet-provider");


/*======================================================
	2.	CREATE PROVIDER AND WEB3 INSTANCE 
======================================================*/
/*
	1.	METAMASK MNEMONIC
*/
const mnemonic = "";
/*
	2.	DEFINE PROVIDER
*/
const rinkebyNetwork = "";
const provider = new HDWalletProvider( mnemonic, rinkebyNetwork );
const web3 = new Web3( provider );

export default web3;