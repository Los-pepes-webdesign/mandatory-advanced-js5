import React from 'react';
import { getMoreFiles } from '../../../utilities/dropbox';

export default function MoreFiles() {
	return (
		<div className='getMoreFiles' onClick={getMoreFiles}>
			Load more files
		</div>
	);
}
