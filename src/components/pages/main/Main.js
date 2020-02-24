import React, {useState, useReducer, useEffect} from 'react';
import { Redirect } from 'react-router';
import { Dropbox } from 'dropbox';
import Mainmenu from './Mainmenu';
import Header from './Header';
import Content from './Content';
import Profile from './Profile';

const dropbox = new Dropbox({
	clientId : 'wwft9hg3g9qhuth',
	fetch
	});

export default function Main() {
	useEffect(() => {
		getAllFiles();
	}, [])

	if (window.location.hash.length < 2) return <Redirect to='/login' />;
		const regex = new RegExp(/=(.*)(?=&token_type)/, 'i');
		const token = window.location.hash.match(regex)[1];

		function getAllFiles () {
			dropbox.setAccessToken(token);
			dropbox.filesListFolder({
			path: ''
		}).then(response =>
			console.log(response));
		}
	return (
		<div className='main'>
			<Mainmenu />
			<Header />
			<Profile />
			<Content />
		</div>
	);
}
