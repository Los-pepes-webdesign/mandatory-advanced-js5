import React, { useState, useRef } from 'react';
import { setState$, token$, setToken$, useObservable } from '../../../utilities/store';
import { dropbox } from '../../../utilities/dropbox';
import FolderPopup from './FolderPopup'

export default function Menu() {
	const fileInputRef = useRef(null);
	const [folderInput, updateFolderInput] = useState('');
	const [visible, toggleVisible] = useState('visible');
	const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;

	function fileUpload(e) {
		e.preventDefault();
		let file = fileInputRef.current.files[0];
		console.log(file);
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

	function newFolder(e) {
		e.preventDefault();
		dropbox
			.filesCreateFolderV2({ path: '/' + folderInput })
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				console.error(error);
			});
	}

function updateInputFolder (e) {
	console.log(e.target.value)
	updateFolderInput(e.target.value)
}

function toggleFolderView () {
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
				<FolderPopup onSubmit={newFolder} onChange={updateInputFolder} name={folderInput} visibility={visible} toggle={toggleFolderView}/>
			<button onClick={toggleFolderView}>New Folder</button>
		</aside>
	);
}
