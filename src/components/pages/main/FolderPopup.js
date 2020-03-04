import React, { useState, useRef, useEffect } from 'react';
import { useObservable, state$ } from '../../../utilities/store';
import { dropbox } from '../../../utilities/dropbox';
import ReactDOM from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import { initFolderPopup } from '../../../utilities/animation';

export default function FolderPopup({ onSubmit, toggle, visibility }) {
	const [ folderInput, updateFolderInput ] = useState('');
	const [ path, setPath ] = useState('');
	const { files } = useObservable(state$);
	const folderPopupRef = useRef(null);

	function newFolder(e) {
		e.preventDefault();
    let p = path;
    if (path.length === 0) {
      p =window.location.pathname;
    }
		dropbox
			.filesCreateFolderV2({ path: p + '/' + folderInput })
			.then(function(response) {
				console.log(response);
			})
			.catch(function(error) {
				console.error(error);
			});
	}

	function updateInputFolder(e) {
		console.log(e.target.value);
		updateFolderInput(e.target.value);
	}

	useEffect(() => {
		initFolderPopup(folderPopupRef.current);
	}, []);

	return ReactDOM.createPortal(
		<div
			className="folder-popup"
			ref={folderPopupRef}
			style={{ visibility: visibility }}
		>
			<h1>Create Folder</h1>
			<CloseIcon onClick={toggle} />
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
					<button onClick={toggle} type="submit">
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
							{file.name}
						</div>
					))}
			</div>
		</div>,
		document.querySelector('body')
	);
}
