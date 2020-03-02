import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { dropbox } from '../../../utilities/dropbox';
import gsap from 'gsap';

export default function DeletionModal({ path, closeModal }) {
	const modal = useRef(null);
	const close = useCallback(
		() => {
			gsap.to(modal.current, {
				duration: 0.2,
				opacity: 0,
				scale: 0,
				transformOrigin: 'bottom',
				onComplete: closeModal
			});
		},
		[ closeModal ]
	);

	useEffect(
		() => {
			window.addEventListener('click', close);

			gsap.to(modal.current, {
				duration: 0.2,
				opacity: 1
			});

			gsap.from(modal.current, {
				duration: 0.2,
				scale: 0,
				transformOrigin: 'bottom'
			});

			return () => window.removeEventListener('click', close);
		},
		[ close ]
	);

	function stopPropagation(e) {
		e.stopPropagation();
	}

	function deleteItem(e) {
		dropbox.filesDelete({ path }).then(() => closeModal()).catch(console.error);
	}

	return ReactDOM.createPortal(
		<div className='deletionModal' onClick={stopPropagation} ref={modal}>
			<h4>
				Are you sure about this, <span>gringo</span>?
			</h4>
			<button type='button' onClick={deleteItem}>
				Hasta la vista, baby
			</button>
			<button type='button' onClick={close}>
				Non por favor, <span>señor</span>!
			</button>
		</div>,
		document.querySelector('body')
	);
}
