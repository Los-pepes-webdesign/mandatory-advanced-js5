import React, { useState, useEffect } from 'react';
import { useObservable, state$ } from '../../../utilities/store';
import { dropbox } from '../../../utilities/dropbox';
import ReactDOM from 'react-dom';
import FolderIcon from '@material-ui/icons/Folder';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { sortFiles } from '../../../utilities/dropbox';

export default function Move(props) {
	const [ path, updatePath ] = useState('');
	const currentPath = props.fileMove.path_lower;
	const { files } = useObservable(state$);
	const [ parent, setParent ] = useState([]);
	const [ folderList, setFolderList ] = useState(files);

	let currentFile = '/' + currentPath.split('/').pop();

	useEffect(() => {
		folderDepth('');
	}, []);

	function onChange(e) {
		const value = e.target.value;
		updatePath(value);
	}

	function executeChange() {
		let newPath;
		if (path.length === 0) {
			newPath = currentFile;
		} else {
			newPath = path + currentFile;
		}

		let move = {
			from_path: currentPath,
			to_path: newPath
		};
		dropbox
			.filesMoveV2(move)
			.then((response) => {
				props.onDone();
			})
			.catch((error) => {
				console.error('Move File server ERROR: ' + error);
			});
	}

	function closeBox() {
		props.onDone();
	}

	function folderDepth(filePathLower) {
		if (parent.length < 0) {
			setParent(filePathLower);
		} else {
			if (parent[parent.length - 1] !== filePathLower) {
				setParent([ ...parent, filePathLower ]);
			}
		}

		dropbox.filesListFolder({ path: filePathLower }).then(({ entries }) => {
			const { folders } = sortFiles(entries);
			setFolderList(folders);
		});

		updatePath(filePathLower);
	}

	function goToParent() {
		if (parent.length > 1) {
			parent.pop();
			const parentFolder = parent[parent.length - 1];
			folderDepth(parentFolder);
		}
	}

	return ReactDOM.createPortal(
		<React.Fragment>
			<div className="backdropBlur">
				<div className="move" style={{ marginLeft: '30px' }}>
					<div className="move__container">
						<h1>Move file</h1>
						<p className="move__text">
							Current location:PepesBox{currentPath}
						</p>
						<div className="move__inputContainer">
							<p className="move__inputPrefix">
								New location: PepesBox/
							</p>
							<input
								className="move__input"
								type="text"
								onChange={onChange}
								value={path}
								placeholder="Leave blank to move to ROOT..."
							/>
							<p className="move__input__ext">{currentFile}</p>
						</div>
						<div className="move__buttonContainer">
							<button
								className="move__buttonOk"
								onClick={executeChange}
							>
								Ok
							</button>
							<button
								className="move__buttonCancel"
								onClick={closeBox}
							>
								Cancel
							</button>
						</div>
					</div>
					<div className="move__galleryContainer">
						<button
							className="move__galleryContainer__parentButton"
							onClick={goToParent}
						>
							Parent Folder
							<SubdirectoryArrowRightIcon className="hello" />
						</button>
						{folderList
							.filter((file) => file['.tag'] === 'folder')
							.map((file) => (
								<div
									className="move__galleryContainer__folder"
									key={file.id}
									onClick={() => folderDepth(file.path_lower)}
								>
									<FolderIcon />
									<p>{file.name}</p>
								</div>
							))}
					</div>
				</div>
			</div>
		</React.Fragment>,
		document.querySelector('body')
	);
}
