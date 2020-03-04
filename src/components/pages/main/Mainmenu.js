import React, { useState, useRef, useEffect } from 'react';
import { dropbox } from '../../../utilities/dropbox';
import FolderPopup from './FolderPopup';
import { Link } from 'react-router-dom';
import { formatPaths } from '../../../utilities/helpers';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PublishIcon from '@material-ui/icons/Publish';

export default function Menu() {
	const [ paths, setPaths ] = useState([]);
	const fileInputRef = useRef(null);
	const [ visible, toggleVisible ] = useState('hidden');
	const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
	let hash = window.location.pathname;

	function fileUpload(e) {
		e.preventDefault();
		let file = fileInputRef.current.files[0];
		if (file.size < UPLOAD_FILE_SIZE_LIMIT) {
			dropbox
				.filesUpload({ path: '/' + file.name, contents: file })
				.then(function() {
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
			console.log(hash);

			// if (hash === '/starred' || hash === '/search') {
			// 	return;
			// }
			let string = hash
				.replace(/%20/g, ' ')
				.replace(/%C3%A5/g, 'å')
				.replace(/%C3%A4/g, 'ä')
				.replace(/%C3%B6/g, 'ö');
			let paths = string.split('/');

			setPaths(formatPaths(paths));
		},
		[ hash ]
	);

	return (
		<aside className="mainmenu">
			<form onSubmit={fileUpload}>
				<PublishIcon />
				<label id="folder_label">
					Upload File
					<input
						ref={fileInputRef}
						onChange={fileUpload}
						placeholder="Upload File"
						type="file"
						id="file-upload"
						class="hidden"
					/>
				</label>
			</form>
			<FolderPopup visibility={visible} toggle={toggleFolderView} />
			<button onClick={toggleFolderView}>
				<CreateNewFolderIcon />
				<label>New Folder</label>
			</button>
			<Link to="/starred">Favorites</Link>
			<p>
				<Link to="/">Home</Link>
			</p>
			{paths.map((path) => (
				<p key={path.path}>
					<Link to={path.path}>{path.title}</Link>
				</p>
			))}
		</aside>
	);
}
