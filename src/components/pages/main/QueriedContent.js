import React from 'react';

import Mainmenu from './Mainmenu';
import Header from './Header';
import Content from './Content';
import Profile from './Profile';

export default function QueriedContent() {
	return (
		<React.Fragment>
			<Mainmenu />
			<Header />
			<Profile />
		</React.Fragment>
	);
}
