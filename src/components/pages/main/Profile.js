import React from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useObservable, state$ } from '../../../utilities/store';

export default function Profile() {
	const { profile } = useObservable(state$);

	if (!profile.name) return null;

	return (
		<div className='profile'>
			<AccountBoxIcon />
			<div className='profile__information'>
				<div className='greeting'>Hola, {profile.name.display_name}</div>
				<div className='email'>{profile.email}</div>
			</div>
			<div className='profile__more'>
				<MoreVertIcon />
			</div>
		</div>
	);
}
