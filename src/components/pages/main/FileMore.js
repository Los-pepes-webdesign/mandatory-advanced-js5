import React, { useState } from 'react';
import Rename from './Rename';
import Move from './Move';

import DeletionModal from './Content.DeletionModal';

export default function FileMore(props) {
	const [ localState, setLocalState ] = useState({
		path: '',
		modal: false
	});
	const [ popRename, updatePopRename ] = useState(false);
	const [ popMove, updatePopMove ] = useState(false);

	function rename() {
		let test = props.fileDetails.path_lower.split('');
		let booly = false;
		for (let i = 0; i < test.length; i++) {
			if (test[i] === '.') {
				booly = true;
				updatePopRename(!popRename);
				break;
			}
			else {
				booly = false;
			}
		}

		if (!booly) {
			console.log('FUNKAR INTE PÅ MAPPAR');
			alert('FUNKAR INTE PÅ MAPPAR!');
		}
	}

	function move() {
		updatePopMove(!popMove);
	}

	return (
		<React.Fragment>
			<div
				className='fileMore'
				style={{
					left: props.buttonPosition.x - 50,
					top: props.buttonPosition.y + 40,
					display: popRename ? 'none' : null
				}}
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
				<div className='fileMore__textContainer'>
					<p className='fileMore__textContainer__text'>Details</p>
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
			{localState.modal && (
				<DeletionModal
					path={localState.path}
					closeModal={() => setLocalState({ ...localState, modal: false })}
				/>
			)}
		</React.Fragment>
	);
}
