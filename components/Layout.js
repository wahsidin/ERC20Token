import React from 'react'; 
import Header from './Header';
import {Container} from 'semantic-ui-react';
/*
	Head is html <head> tag 
*/
import Head from 'next/head';


export default (props) =>{
	return (
		<Container>
			<Head>
				<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css " />
			</Head>
			<Header/>
			{props.children}
		</Container>
	);
};