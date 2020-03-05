import React, { useState, useRef, useEffect } from 'react';
import { useObservable, state$ } from '../../../utilities/store';
import { dropbox } from '../../../utilities/dropbox';
import ReactDOM from 'react-dom';
import FolderIcon from '@material-ui/icons/Folder';
import CloseIcon from '@material-ui/icons/Close';
import { initFolderPopup } from '../../../utilities/animation';

export default function FolderPopup({ onSubmit, closePopup }) {
	const [ folderInput, updateFolderInput ] = useState('');
	const [ path, setPath ] = useState('');
	const { files } = useObservable(state$);
	const folderPopupRef = useRef(null);

	function newFolder(e) {
		e.preventDefault();

		dropbox
			.filesCreateFolderV2({
				path: (path.length > 1 ? path : '') + '/' + folderInput
			})
			.then(function(response) {
				console.log(response);
				closePopup();
			})
			.catch(function(error) {
				console.error(error);
			});
	}
	function hampus() {
		closePopup();
	}
	function updateInputFolder(e) {
		updateFolderInput(e.target.value);
	}

	useEffect(() => {
		initFolderPopup(folderPopupRef.current);
	}, []);

	return ReactDOM.createPortal(
		<div className="folder-popup" ref={folderPopupRef}>
			<h1>Create Folder</h1>
			<button onClick={hampus} className="poopbutton">
				<CloseIcon id="close_icon" />
			</button>

			<div className="popup-container">
				<form onSubmit={newFolder}>
					<label>Name:</label>
					<input
						type="text"
						onChange={updateInputFolder}
						value={folderInput}
						id="create-folder"
						placeholder="Folder name"
					/>
					<button onClick={newFolder} type="submit">
						Submit
					</button>
				</form>
			</div>
			<div className="popup-folders">
				{files
					.filter((file) => file['.tag'] === 'folder')
					.map((file) => (
						<div
							key={file.id}
							onClick={() => setPath(file.path_lower)}
						>
							<FolderIcon />
							<p>{file.name}</p>
						</div>
					))}
			</div>
		</div>,
		document.querySelector('body')
	);
}
