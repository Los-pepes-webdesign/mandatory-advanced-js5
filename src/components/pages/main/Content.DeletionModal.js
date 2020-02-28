import React from 'react';
import ReactDOM from 'react-dom';
import { dropbox } from '../../../utilities/dropbox';

export default function DeletionModal({ path, closeModal }) {
	function deleteItem() {
		dropbox.filesDelete({ path }).then(console.log).catch(console.error);
	}

	return ReactDOM.createPortal(
		<div className='deletionModal'>
			<h4>
				Are you sure about this, <span>gringo?</span>
			</h4>
			<button type='button' onClick={deleteItem}>
				Hasta la vista, baby
			</button>
			<button type='button' onClick={closeModal}>
				Non por favor, señor!
			</button>
		</div>,
		document.querySelector('body')
	);
}
