import React, { useState, useRef, useEffect } from 'react';
import { dropbox } from '../../../utilities/dropbox';
import FolderPopup from './FolderPopup';
import { Link } from 'react-router-dom';
import { formatPaths } from '../../../utilities/helpers';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
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
			if (hash === '/starred' || hash === '/search') {
				return;
			}
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
		<aside className='mainmenu'>
		 <div className="mainmenu__home">
			<Link to='/'><HomeIcon /><label>Home</label></Link>
		 </div>
			<div className="mainmenu__favorite">
				<Link to='/starred'><StarIcon /><label>Favorites</label></Link>
			</div>
			<div className="mainmenu__upload">
			<form onSubmit={fileUpload} id='file-upload-form'>
				<PublishIcon />
				<label id='folder_label'>Upload File
				<input ref={fileInputRef} onChange={fileUpload} placeholder='Upload File' type='file' id='file-upload-input' className="hidden" />
					</label>
			</form>
		</div>
		<div className="mainmenu__newfolder">
			<button onClick={toggleFolderView}><CreateNewFolderIcon /><label>New Folder</label></button>
		</div>
			<FolderPopup visibility={visible} toggle={toggleFolderView} />

			{paths.map((path) => (
				<p key={path.path}>
					<Link to={path.path}>{path.title}</Link>
				</p>
			))}
		</aside>
	);
}
