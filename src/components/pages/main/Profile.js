import React, { useState } from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useObservable, state$ } from '../../../utilities/store';
import ProfileMore from "./ProfileMore";


export default function Profile() {
	const { profile } = useObservable(state$);
	const [showMore, updateShowMore] = useState(false);

	if (!profile.name) return null;

	return (
		<div className='profile'>
			<AccountBoxIcon />
			<div className='profile__info'>
				<div className="profile__info__userAvatar">[AvatarIcon]</div>
				<div className='profile__info__greeting'>Hola, {profile.name.given_name}!</div>
			</div>
			<button className="profile__info__moreButton" onClick={() => updateShowMore(!showMore)}><MoreVertIcon /></button>
			{ showMore ? <ProfileMore profile={profile}/> : null }
		</div>
	);
}
