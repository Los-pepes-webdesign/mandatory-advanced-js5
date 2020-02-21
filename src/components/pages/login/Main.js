import React from 'react';
import { Dropbox } from 'dropbox';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const dropbox = new Dropbox({
	clientId : 'wwft9hg3g9qhuth',
	fetch
});

export default function Main() {
	return (
		<main className='login__main'>
			<a href={dropbox.getAuthenticationUrl('http://localhost:3000/')} className='login__main__buttonContainer'>
				<div className='login__main__button'>
					<div tabIndex='0' className='login__main__icon'>
						<ArrowForwardIcon />
					</div>
				</div>
			</a>
		</main>
	);
}
