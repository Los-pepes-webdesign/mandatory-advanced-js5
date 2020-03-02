// library imports
import React, { useEffect, useState } from 'react';
import { Redirect, Switch, Route } from 'react-router';

// store imports
<<<<<<< HEAD
import {
	dropbox,
	setState$,
	token$,
	setToken$,
	useObservable
} from '../../../utilities/store';
=======
import { token$, setToken$, useObservable } from '../../../utilities/store';
import { init, getFolderContent } from '../../../utilities/dropbox';
>>>>>>> 471f961e9d593d0fba1b7be18b3a9f745eca95ff

// component imports
import Mainmenu from './Mainmenu';
import Header from './Header';
import Content from './Content';
import Profile from './Profile';
import QueriedContent from './QueriedContent';

// component
export default function Main({ location }) {
<<<<<<< HEAD
	const [ hashStatus, setHashStatus ] = useState(null);
	const accessToken = useObservable(token$);
=======
	const [ hashStatus, setHashStatus ] = useState(null); // controls redirect to '/login' or '/'
	const accessToken = useObservable(token$); // token subscription
>>>>>>> 471f961e9d593d0fba1b7be18b3a9f745eca95ff

	useEffect(
		() => {
			console.log('path changed', location.pathname);
		},
		[ location.pathname ]
	);

	useEffect(
		() => {
			if (
				!window.location.hash.includes('access_token') &&
				!accessToken
			) {
				setHashStatus('invalid');
			} else {
				if (!accessToken) {
					const regex = new RegExp(/=(.*)(?=&token_type)/, 'i');
					const token = window.location.hash.match(regex)[1];
					setToken$(token);
					setHashStatus('valid');
<<<<<<< HEAD
				} else {
					dropbox.setAccessToken(accessToken);
				}

				dropbox
					.filesListFolder({
						path: location.pathname === '/' ? '' : location.pathname
					})
					.then(({ entries }) => {
						const folders = entries.filter(
							(file) => file['.tag'] === 'folder'
						);
						const files = entries.filter(
							(file) => file['.tag'] === 'file'
						);
						const promises = files.map((file) =>
							dropbox.filesGetTemporaryLink({
								path: file.path_lower
							})
						);

						Promise.all(promises).then((result) => {
							setState$(
								[
									...folders,
									...result.map((path, index) => ({
										...files[index],
										href: path.link
									}))
								],
								'setFiles'
							);
						});
					});
=======
				}
>>>>>>> 471f961e9d593d0fba1b7be18b3a9f745eca95ff

				if (location.pathname === '/') init();
				else getFolderContent(location.pathname);
			}
		},
<<<<<<< HEAD
		[ location, accessToken ]
=======
		[ accessToken, location ]
>>>>>>> 471f961e9d593d0fba1b7be18b3a9f745eca95ff
	);

	return (
		<React.Fragment>
			{hashStatus === 'invalid' && <Redirect to="/login" />}
			{hashStatus === 'valid' && <Redirect to="/" />}
			<div className="main">
				<Mainmenu />
				<Header />
				<Profile />
				<Switch>
					<Route path="/search" component={QueriedContent} />
					<Route path="/" component={Content} />
				</Switch>
			</div>
		</React.Fragment>
	);
}
