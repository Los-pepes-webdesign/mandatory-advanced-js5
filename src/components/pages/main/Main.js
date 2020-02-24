import React from 'react';
import { Redirect } from 'react-router';

import Mainmenu from './Mainmenu';
import Header from './Header';
import Content from './Content';
import Profile from './Profile';

const regex = new RegExp(/=(.*)(?=&token_type)/, 'i');
const token = window.location.hash.match(regex)[1];

export default function Main() {
	if (window.location.hash.length < 2) return <Redirect to='/login' />;

	return (
		<div className='main'>
			<Mainmenu />
			<Header />
			<Profile />
			<Content />
		</div>
	);
}
