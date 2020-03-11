import React, { useState, useEffect } from 'react';
import { dropbox } from '../../../utilities/dropbox';
import ReactDOM from 'react-dom';

export default function Rename(props) {
	const [ filename, updateFilename ] = useState('');
	const [ extension, updateExtension ] = useState('');

	const filePath = props.fileRename.path_lower;
	const oldName = filePath.substring(1);

	// Regex to match the path upto and including the last slash, needed to change filename inside a folder depth
	const regex = /^(.*[\\/])/g;
	const pathFront = filePath.match(regex);

	useEffect(
		() => {
			// Check if type is FILE (has an extension) and if so extracts the file extension
			if (props.fileRename['.tag'] === 'file') {
				const currentExt = '.' + props.fileRename.path_lower.split('.').pop();
				updateExtension(currentExt);
			}
		},
		[ props.fileRename ]
	);

	function onChange(e) {
		updateFilename(e.target.value);
	}

	function executeChange() {
		const newName = pathFront + filename + extension;
		const rename = {
			from_path: filePath,
			to_path: newName
		};
		dropbox
			.filesMoveV2(rename)
			.then(() => {
				props.onDone();
			})
			.catch((error) => {
				console.error('Rename File server ERROR: ' + error);
			});
	}

	function closeBox() {
		props.onDone();
	}

	return ReactDOM.createPortal(
		<div className='backdropBlur'>
			<div
				className='rename'
				style={{ marginLeft: '30px' }}
				onClick={(e) => e.stopPropagation()}
			>
			<div className="rename__top">
			<h1>Rename file</h1>
			<button
				className="rename__buttonClose"
				onClick={closeBox}>
				x
			</button>
			</div>
			<div className="rename__container">
				<p className='rename__text'>Change name of: {oldName}</p>
				<div className='rename__inputContainer'>
					<input
						className='rename__input'
						type='text'
						onChange={onChange}
						value={filename}
					/>
					<p className='rename__input__ext'>{extension}</p>
				</div>
				<div className='rename__buttonContainer'>
					<button className='rename__buttonOk' onClick={executeChange}>
						Ok
					</button>
					<button className='rename__buttonCancel' onClick={closeBox}>
						Cancel
					</button>
				</div>
			</div>
			</div>
		</div>,
		document.querySelector('body')
	);
}
