import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import {
	dropbox,
	setState$
} from '../../../utilities/store';

import Mainmenu from './Mainmenu';
import Header from './Header';
import Content from './Content';
import Profile from './Profile';

export default function Main() {
	const [ invalidHash, setInvalidHash ] = useState(false);

	useEffect(() => {
		if (window.location.hash.length < 2) {
			setInvalidHash(true);
		} else {
			const regex = new RegExp(
				/=(.*)(?=&token_type)/,
				'i'
			);
			const token = window.location.hash.match(
				regex
			)[1];
			dropbox.setAccessToken(token);
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
				.then((response) => {
					setState$(response, 'setProfile');
				});
		}
	}, []);

	return (
		<React.Fragment>
			{invalidHash && <Redirect to="/login" />}
			<div className="main">
				<Mainmenu />
				<Header />
				<Profile />

				<Content />
			</div>
		</React.Fragment>
	);
}
