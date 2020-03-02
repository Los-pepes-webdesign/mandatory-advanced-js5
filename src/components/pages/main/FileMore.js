import React, { useState } from 'react';
import Rename from './Rename';

import DeletionModal from './Content.DeletionModal';

export default function FileMore(props) {
	const [ localState, setLocalState ] = useState({
		path: '',
		modal: false
	});
	const [ popRename, updatePopRename ] = useState(false);

	function alertBox() {
		alert('Naj! Jesper jobbar på RENAME och MOVE');
	}

	function popup() {
		let test = props.fileDetails.path_lower.split('');
		let booly = false;
		for (let i = 0; i < test.length; i++) {
			if (test[i] === '.') {
				updatePopRename(!popRename);
				booly = true;
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
				<div className='fileMore__textContainer' onClick={popup}>
					<p className='fileMore__textContainer__text'>Rename</p>
				</div>
				<div className='fileMore__textContainer' onClick={alertBox}>
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
				<Rename fileRename={props.fileDetails} popRenameFunc={updatePopRename} onDone={props.onClose} />
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
