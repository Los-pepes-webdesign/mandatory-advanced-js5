import React, { useRef } from 'react';
import LinkIcon from '@material-ui/icons/Link';
import { Redirect } from 'react-router';
import { dropbox, setToken$, token$, useObservable, state$ } from '../../../utilities/store';
import { userSpaceFormatting } from '../../../utilities/helpers';

export default function ProfileMore() {
	const { profile, userSpace } = useObservable(state$);
	const refInput = useRef(null);

	// Copies referral link to clipboard
	// Input field needed for the execCommand
	// Dummy input field is positioned 1000 pixels above page top
	function copyToClipboard(e) {
		refInput.current.select();
		document.execCommand('copy');
	}

	// Logs out user by setting local token to <null> and revokes token from Dropbox API
	function logoutUser() {
		console.log(userSpace);

		dropbox.authTokenRevoke();
		setToken$(null);
	}

	return (
		<React.Fragment>
			{!token$.value && <Redirect to='/login' />}
			<div className='profile__more'>
				<div className='profile__more__profileInfo'>
					<div className='profile__more__profileInfo__name'>
						<p className='profile__more__profileInfo__name__text'>
							{profile.name.display_name}
						</p>
					</div>
					<div className='profile__more__profileInfo__email'>
						<p className='profile__more__profileInfo__email__text'>{profile.email}</p>
					</div>
				</div>
				<div className='profile__more__lineBreakFat' />
				<div className='profile__more__spaceUsage'>
					<p className='profile__more__spaceUsageText'>
						{userSpaceFormatting(userSpace)}{' '}
					</p>
				</div>
				<div className='profile__more__lineBreak' />
				<div className='profile__more__refLinkHeader'>
					<p className='profile__more__refLinkHeader__text'>Referral Link</p>
				</div>
				<input
					className='profile__more__refLinkInputDummy'
					ref={refInput}
					type='text'
					readOnly
					value={profile.referral_link}
				/>
				<button className='profile__more__refLinkButton' onClick={copyToClipboard}>
					<div className='profile__more__refLinkButton__textContainer'>
						<p className='profile__more__refLinkButton__textContainer__text'>Copy</p>
					</div>
					<LinkIcon className='profile__more__refLinkButton__linkIcon' />
					<div className='profile__more__refLinkButton__textContainer'>
						<p className='profile__more__refLinkButton__textContainer__text'>link</p>
					</div>
				</button>
				<div className='profile__more__lineBreak' />
				<button className='profile__more__logoutButton' onClick={logoutUser}>
					<p>Logout</p>
				</button>
			</div>
		</React.Fragment>
	);
}
