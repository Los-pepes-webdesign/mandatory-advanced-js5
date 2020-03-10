import React, { useState, useEffect } from 'react';
import { dropbox } from '../../../utilities/dropbox';
import Rename from './Rename';
import Move from './Move';
import Copy from './Copy';

import DeletionModal from './Content.DeletionModal';

export default function FileMore(props) {
	const [ localState, setLocalState ] = useState({
		path: '',
		modal: false
	});
	const [ popRename, updatePopRename ] = useState(false);
	const [ popMove, updatePopMove ] = useState(false);
	const [ popCopy, updatePopCopy ] = useState(false);

	useEffect(
		() => {
			function close() {
				props.showMoreFunction(false);
			}

			window.addEventListener('click', close);
			return () => window.removeEventListener('click', close);
		},
		[ props ]
	);

	function rename() {
		updatePopRename(!popRename);
	}

	function move() {
		updatePopMove(!popMove);
	}

	function copy() {
		updatePopCopy(!popCopy);
	}

	function downloadContent(){
		if (props.fileDetails['.tag'] == 'file'){
			function download(dataurl, filename) {
			   let a = document.createElement("a");
			   a.href = dataurl;
			   a.setAttribute("download", filename);
			   a.click();
				 a.remove();
			 }
			 download(props.fileDetails.link, props.fileDetails.name);
		} else if (props.fileDetails['.tag'] == 'folder') {
			const folderDownload = { path: props.fileDetails.path_lower };
			dropbox.filesDownloadZip(folderDownload)
				.then((response) => {
					console.log(response.fileBlob);
					console.log(response.metadata.name);

					let blob = response.fileBlob;

					function downloadFolder(dataurl, fileName) {
						 let a = document.createElement("a");
						 a.href = dataurl;
						 a.setAttribute("download", fileName);
						 a.click();
						 a.remove();
					 }
					 downloadFolder(blob, response.metadata.name);


			});
		}

	}

	function stopPropagation(e) {
		e.stopPropagation();
	}

	return (
		<React.Fragment>
			<div
				className='fileMore'
				style={{
					left: props.buttonPosition.x,
					top: props.buttonPosition.y,
					display: popRename || popMove || popCopy ? 'none' : null
				}}
				onClick={stopPropagation}
			>
				<div className='fileMore__textContainer' onClick={rename}>
					<p className='fileMore__textContainer__text'>Rename</p>
				</div>
				<div className='fileMore__textContainer' onClick={move}>
					<p className='fileMore__textContainer__text'>Move</p>
				</div>
				<div className='fileMore__textContainer' onClick={downloadContent}>
					<p className='fileMore__textContainer__text'>Download</p>
				</div>
				<div className='fileMore__textContainer' onClick={copy}>
					<p className='fileMore__textContainer__text'>Copy</p>
				</div>
				<div className='fileMore__textContainer'>
					<p className='fileMore__textContainer__text'>Favorite</p>
				</div>
				<div
					className='fileMore__textContainer'
					onClick={() =>
						setLocalState({
							path: props.fileDetails.path_lower,
							modal: true
						})}
				>
					<p className='fileMore__textContainer__text'>Delete</p>
				</div>
			</div>
			{popRename && (
				<Rename
					fileRename={props.fileDetails}
					popRenameFunc={updatePopRename}
					onDone={props.onClose}
				/>
			)}

			{popMove && (
				<Move
					fileMove={props.fileDetails}
					popMoveFunc={updatePopMove}
					onDone={props.onClose}
				/>
			)}

			{popCopy && (
				<Copy
					fileCopy={props.fileDetails}
					popCopyFunc={updatePopCopy}
					onDone={props.onClose}
				/>
			)}

			{localState.modal && (
				<DeletionModal
					path={localState.path}
					closeModal={() => setLocalState({ ...localState, modal: false })}
				/>
			)}
		</React.Fragment>
	);
}
