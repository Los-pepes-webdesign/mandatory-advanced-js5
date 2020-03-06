// library imports
import React, { useEffect, useState } from 'react';
import { Redirect, Switch, Route } from 'react-router';

// store imports
import { token$, setToken$, useObservable, setState$ } from '../../../utilities/store';
import { init, getFolderContent } from '../../../utilities/dropbox';

// component imports
import Mainmenu from './Mainmenu';
import Header from './Header';
import Content from './Content';
import Profile from './Profile';
import StarredContent from './StarredContent';
import QueriedContent from './QueriedContent';

// component
export default function Main({ location }) {
	const [ hashStatus, setHashStatus ] = useState(null); // controls redirect to '/login' or '/'
	const accessToken = useObservable(token$); // token subscription

	useEffect(
		() => {
			if (!window.location.hash.includes('access_token') && !accessToken) {
				setHashStatus('invalid');
			}
			else {
				if (!accessToken) {
					const regex = new RegExp(/=(.*)(?=&token_type)/, 'i');
					const token = window.location.hash.match(regex)[1];
					setToken$(token);
					setHashStatus('valid');
				}

				// setState$(location.pathname, 'setCurrentPath');

				if (location.pathname === '/starred' || location.pathname === '/search') return;
				else if (location.pathname === '/') init();
				else getFolderContent(location.pathname);
			}
		},
		[ accessToken, location.pathname ]
	);

	return (
		<React.Fragment>
			{hashStatus === 'invalid' && <Redirect to='/login' />}
			{hashStatus === 'valid' && <Redirect to='/' />}

			<div className='main'>
				<Mainmenu />
				<Header />
				<Profile />
				<Switch>
					<Route path='/search' component={QueriedContent} />
					<Route path='/starred' component={StarredContent} />
					<Route path='/' component={Content} />
				</Switch>
			</div>
		</React.Fragment>
	);
}
