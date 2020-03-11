import React from 'react';
import { dropbox } from '../../../utilities/dropbox';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default function Main() {
	return (
		<main className='login__main'>
			<a
				href={dropbox.getAuthenticationUrl('https://legal-question.surge.sh/')}
				className='login__main__buttonContainer'
			>
				<div className='login__main__button'>
					<div tabIndex='0' className='login__main__icon'>
						<ArrowForwardIcon />
					</div>
				</div>
			</a>
		</main>
	);
}
