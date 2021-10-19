import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';


export default () =>{
	return (
		<Menu style={{ marginTop: '10px'}}>
			<Link route="/">
				<a className="item">ERC20 Token</a>
			</Link>

			<Menu.Menu position="right">
				<Link route="/token/transfer">
					<a className="item">Transfer</a>
				</Link>
				<Link route="/token/transferFrom">
					<a className="item">Transfer From</a>
				</Link>
			</Menu.Menu>
		</Menu>
	);
};