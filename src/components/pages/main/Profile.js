import React, { useState } from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useObservable, state$ } from '../../../utilities/store';
import ProfileMore from './ProfileMore';

export default function Profile() {
	const { profile } = useObservable(state$);
	const [ showMore, updateShowMore ] = useState(false);

	if (!profile.name) return null;

	return (
		<div className='profile'>
			<div className="profile__userIconContainer">
				<AccountBoxIcon className="profile__userIconContainer__userIcon"/>
			</div>
			<div className='profile__info'>
				<div className='profile__info__greeting'>
					<p className='profile__info__greeting__text'>Hola, {profile.name.given_name}!</p>
				</div>
			</div>
			<button
				className='profile__info__moreButton'
				onClick={() => updateShowMore(!showMore)}>
				<MoreVertIcon className="moreVertIcon" />
			</button>
			{showMore ? <ProfileMore /> : null}
		</div>
	);
}
