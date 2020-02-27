import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { dropbox, setToken$ } from '../../../utilities/store';

export default function ProfileMore(profile) {
	const [ logout, updateLogout ] = useState(false);

	function onClickRefLinkButton(e) {
		//console.log(e.target.value);
	}

	function logoutUser() {
		dropbox.authTokenRevoke();
		setToken$(null);
		updateLogout(!logout);
		// Add && in redirect condition to check that the Token really is revoked
	}

	return (
		<React.Fragment>
			{logout ? <Redirect to='/login' /> : null}
			<div className='profile__more'>
				<div className='profile__more__profileInfo'>
					<div className='profile__more__profileInfo__userAvatar'>
						[AvatarIcon]
					</div>
					<div className='profile__more__profileInfo__name'>
						{profile.profile.name.display_name}
					</div>
					<div className='profile__more__profileInfo__email'>
						{profile.profile.email}
					</div>
				</div>
				<div className='profile__more__lineBreak' />
				<div className='profile__more__refLinkHeader'>
					<p className='profile__more__refLinkHeader__text'>
						Referral Link
					</p>
				</div>
				<button
					className='profile__more__refLinkButton'
					value={profile.profile.referral_link}
					onClick={onClickRefLinkButton}>
					Copy link
				</button>
				<div className='profile__more__lineBreak' />
				<button
					className='profile__more__logoutButton'
					onClick={logoutUser}>
					Logout
				</button>
			</div>
		</React.Fragment>
	);
}
