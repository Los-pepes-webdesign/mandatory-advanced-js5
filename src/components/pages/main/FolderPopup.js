import React, { useState, useRef, useEffect } from 'react';
import { useObservable, state$ } from '../../../utilities/store';
import { dropbox } from '../../../utilities/dropbox';
import ReactDOM from 'react-dom';
import FolderIcon from '@material-ui/icons/Folder';
import CloseIcon from '@material-ui/icons/Close';
import { initFolderPopup } from '../../../utilities/animation';
import { sortFiles } from '../../../utilities/dropbox';

export default function FolderPopup({ onSubmit, closePopup, path }) {
	const [ folderInput, updateFolderInput ] = useState('');
	const [ folderPath, setFolderPath ] = useState(path);
	const { files } = useObservable(state$);
	const [ folderList, setFolderList ] = useState(files);
	const folderPopupRef = useRef(null);
	const [ chosen, setChosen ] = useState(false);
	const prevPathRef = useRef();

	function newFolder(e) {
		e.preventDefault();
		dropbox
			.filesCreateFolderV2({
				path: (folderPath.length > 1 ? folderPath : '') + '/' + folderInput
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

	// Animation
	useEffect(() => {
		initFolderPopup(folderPopupRef.current);
	}, []);

	useEffect(
		() => {
			dropbox
				.filesListFolder({ path: folderPath === '/' ? '' : folderPath })
				.then(({ entries }) => {
					const { folders } = sortFiles(entries);
					setFolderList(folders);
				})
				.then(() => {
					prevPathRef.current = folderPath;
				});
		},
		[ folderPath ]
	);

	const prevPath = prevPathRef.current;

	return ReactDOM.createPortal(
		<div className='folder-popup' ref={folderPopupRef}>
			<h1>Create Folder</h1>
			<button onClick={hampus} className='poopbutton'>
				<CloseIcon id='close_icon' />
			</button>

			<div className='popup-container'>
				<form onSubmit={newFolder}>
					<label>Name:</label>
					<input
						type='text'
						onChange={updateInputFolder}
						value={folderInput}
						id='create-folder'
						placeholder='Folder name'
					/>
					<p> PepesBox{folderPath} </p>
					<button onClick={newFolder} type='submit'>
						Submit
					</button>
				</form>
			</div>
			<div className='popup-folders'>
				<div
					onClick={() => {
						setFolderPath(prevPath);
					}}
				>
					Go to parent
				</div>
				{folderList.filter((file) => file['.tag'] === 'folder').map((file) => (
					<div
						style={{ backgroundColor: chosen === file.id ? '#FFC30F' : '' }}
						key={file.id}
						count={file.id}
						active={file.id === chosen ? chosen : undefined}
						onClick={() => {
							setFolderPath(folderPath === file.path_lower ? path : file.path_lower);
							setChosen(chosen === file.id ? '' : file.id);
						}}
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
