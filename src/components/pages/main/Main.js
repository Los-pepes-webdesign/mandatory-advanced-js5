// library imports
import React, { useEffect, useState } from 'react';
import { Redirect, Switch, Route } from 'react-router';

// store imports
import { dropbox, setState$, token$, setToken$, useObservable } from '../../../utilities/store';

// component imports
import Mainmenu from './Mainmenu';
import Header from './Header';
import Content from './Content';
import Profile from './Profile';
import QueriedContent from './QueriedContent';

// component
export default function Main() {
	const [ hashStatus, setHashStatus ] = useState(null);
	const accessToken = useObservable(token$);
	
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
				else {
					dropbox.setAccessToken(accessToken);
				}

				dropbox.filesListFolder({ path: '' }).then(({ entries }) => {
					const folders = entries.filter((file) => file['.tag'] === 'folder');
					const files = entries.filter((file) => file['.tag'] === 'file');
					const promises = files.map((file) =>
						dropbox.filesGetTemporaryLink({ path: file.path_lower })
					);

					Promise.all(promises).then((result) => {
						setState$(
							[
								...folders,
								...result.map((path, index) => ({
									...files[index],
									href : path.link
								}))
							],
							'setFiles'
						);
					});
				});

				dropbox.usersGetCurrentAccount().then((profile) => {
					setState$(profile, 'setProfile');
				});

				// Get user space usage and save it to the global state
				dropbox.usersGetSpaceUsage().then((userSpace) => {
					setState$(userSpace, 'setUserSpace');
				});
			}
		},
		[ accessToken ]
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
					<Route path='/' component={Content} />
				</Switch>
			</div>
		</React.Fragment>
	);
}
