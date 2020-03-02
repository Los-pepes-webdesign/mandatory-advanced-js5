import React, { useState, useRef } from 'react';
import { dropbox } from '../../../utilities/dropbox';
import FolderPopup from './FolderPopup';

export default function Menu({ location }) {
	console.log(location);
	const fileInputRef = useRef(null);
	const [ visible, toggleVisible ] = useState('hidden');
	const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;

	function fileUpload(e) {
		e.preventDefault();
		let file = fileInputRef.current.files[0];
		if (file.size < UPLOAD_FILE_SIZE_LIMIT) {
			dropbox
				.filesUpload({ path: '/' + file.name, contents: file })
				.then(function(response) {
					console.log('File uploaded!');
				})
				.catch(function(error) {
					console.error(error);
				});
		}
	}
	function toggleFolderView() {
		visible === 'visible' ? toggleVisible('hidden') : toggleVisible('visible');
	}
	return (
		<aside className='mainmenu'>
			<p>Upload File</p>
			<br />
			<form onSubmit={fileUpload}>
				<input ref={fileInputRef} type='file' id='file-upload' />
				<button type='submit'>Submit</button>
			</form>
			<FolderPopup visibility={visible} toggle={toggleFolderView} />
			<button onClick={toggleFolderView}>New Folder</button>
		</aside>
	);
}
