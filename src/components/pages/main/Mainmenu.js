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
	const [ visible, toggleVisible ] = useState(false);
	const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
	let hash = window.location.pathname;

	function fileUpload(e) {
		e.preventDefault();
		console.log(hash.length);

		if (hash.length === 1) {
			hash = '';
		}
		let file = fileInputRef.current.files[0];
		if (file.size < UPLOAD_FILE_SIZE_LIMIT) {
			dropbox
				.filesUpload({ path: hash + '/' + file.name, contents: file })
				.then(function() {
					console.log('File uploaded!');
				})
				.catch(function(error) {
					console.error(error);
				});
		}
	}

	function showPopup() {
		toggleVisible(true);
	}

	function closePopup() {
		toggleVisible(false);
	}

	return (
		<React.Fragment>
			{visible && <FolderPopup closePopup={closePopup} />}
			<aside className="mainmenu">
				<div className="mainmenu__home">
					<Link to="/">
						<HomeIcon />
						<label>Home</label>
					</Link>
				</div>
				<div className="mainmenu__favorite">
					<Link to="/starred">
						<StarIcon />
						<label>Favorites</label>
					</Link>
				</div>
				<div className="mainmenu__upload">
					<form onSubmit={fileUpload} id="file-upload-form">
						<PublishIcon />
						<label id="folder_label">
							Upload File
							<input
								ref={fileInputRef}
								onChange={fileUpload}
								placeholder="Upload File"
								type="file"
								id="file-upload-input"
								className="hidden"
							/>
						</label>
					</form>
				</div>
				<div className="mainmenu__newfolder">
					<button onClick={showPopup}>
						<CreateNewFolderIcon />
						<label>New Folder</label>
					</button>
				</div>
			</aside>
		</React.Fragment>
	);
}
