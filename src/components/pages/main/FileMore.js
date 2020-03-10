import React, { useState, useEffect } from 'react';
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
				<div className='fileMore__textContainer'>
					<a
						href={props.fileDetails.link}
						download={props.fileDetails.name}
						className='fileMore__textContainer__text'
					>
						Download
					</a>
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
