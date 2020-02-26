// library imports
import React, { useEffect, useState } from 'react';
import { Redirect, Switch, Route } from 'react-router';

// store imports
import {
	dropbox,
	setState$,
	token$,
	setToken$
} from '../../../utilities/store';

// component imports
import Mainmenu from './Mainmenu';
import Header from './Header';
import Content from './Content';
import Profile from './Profile';
import QueriedContent from './QueriedContent';

// component
export default function Main() {
	const [ hashStatus, setHashStatus ] = useState(null);

	useEffect(() => {
		if (
			!window.location.hash.includes(
				'access_token'
			) &&
			!token$.value
		) {
			console.log(token$.value);
			setHashStatus('invalid');
		} else {
			if (!token$.value) {
				const regex = new RegExp(
					/=(.*)(?=&token_type)/,
					'i'
				);
				const token = window.location.hash.match(
					regex
				)[1];
				setToken$(token);
				setHashStatus('valid');
			} else {
				dropbox.setAccessToken(token$.value);
			}

			dropbox
				.filesListFolder({ path: '' })
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
								...result.map(
									(path, index) => ({
										...files[index],
										href: path.link
									})
								)
							],
							'setFiles'
						);
					});
				});

			dropbox
				.usersGetCurrentAccount()
				.then((profile) => {
					setState$(profile, 'setProfile');
				});
		}
	}, []);

	return (
		<React.Fragment>
			{hashStatus === 'invalid' && (
				<Redirect to="/login" />
			)}
			{hashStatus === 'valid' && <Redirect to="/" />}
			<div className="main">
				<Mainmenu />
				<Header />
				<Profile />

				<Switch>
					<Route
						path="/search"
						component={QueriedContent}
					/>
					<Route path="/" component={Content} />
				</Switch>
			</div>
		</React.Fragment>
	);
}
