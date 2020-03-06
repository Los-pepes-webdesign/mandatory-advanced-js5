import React, { useState } from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useObservable, state$ } from '../../../utilities/store';
import ProfileMore from './ProfileMore';

export default function Profile() {
	const { profile } = useObservable(state$);
	const [ showMore, updateShowMore ] = useState(false);

	if (!profile.name) return null;

	return (
		<div className="profile">
			<div className="profile__sombrero" />
			<div className="profile__info">
				<div className="profile__userIconContainer" />
				<div className="profile__info__greeting">
					<p className="profile__info__greeting__text">
						Hola,{' '}
						{profile.name.given_name.length < 9 ? (
							profile.name.given_name
						) : (
							profile.name.abbreviated_name
						)}!
					</p>
					<button
						className="profile__info__moreButton"
						onClick={() => updateShowMore(!showMore)}
					>
						<ArrowDropDownIcon className="arrowDropDownIcon" />
					</button>
				</div>
			</div>
			{showMore ? <ProfileMore /> : null}
		</div>
	);
}
