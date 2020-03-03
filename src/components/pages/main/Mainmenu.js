import React, { useState, useRef, useEffect } from 'react';
import { dropbox } from '../../../utilities/dropbox';
import FolderPopup from './FolderPopup';
import { Link } from 'react-router-dom';
import { formatPaths } from '../../../utilities/helpers';

export default function Menu({ location }) {
	const [ paths, setPaths ] = useState([]);
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
		visible === 'visible'
			? toggleVisible('hidden')
			: toggleVisible('visible');
	}

	useEffect(
		() => {
			let hash = window.location.pathname;
			let string = hash
				.replace(/\%20/g, ' ')
				.replace(/\%C3%A5/g, 'å')
				.replace(/\%C3%A4/g, 'ä')
				.replace(/\%C3%B6/g, 'ö');
			let paths = string.split('/');

			setPaths(formatPaths(paths));
		},
		[ window.location.pathname ]
	);

	return (
		<aside className="mainmenu">
			<p>Upload File</p>
			<br />
			<form onSubmit={fileUpload}>
				<input ref={fileInputRef} type="file" id="file-upload" />
				<button type="submit">Submit</button>
			</form>
			<FolderPopup visibility={visible} toggle={toggleFolderView} />
			<button onClick={toggleFolderView}>New Folder</button>
			<p>
				<Link to="/">Home</Link>
			</p>
			{paths.map((path) => (
				<p>
					<Link key={path.path} to={path.path}>
						{path.title}
					</Link>
				</p>
			))}
		</aside>
	);
}
