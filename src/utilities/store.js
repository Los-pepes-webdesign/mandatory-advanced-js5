import { Dropbox } from 'dropbox';
import { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';

export const dropbox = new Dropbox({
	clientId : 'wwft9hg3g9qhuth',
	fetch
});

export function useObservable(observable) {
	const [ value, setValue ] = useState(observable.value);

	useEffect(
		() => {
			const subscription = observable.subscribe((newValue) => {
				setValue(newValue);
			});

			return () => subscription.unsubscribe();
		},
		[ observable ]
	);

	return value;
}

export const state$ = new BehaviorSubject({
	files       : [],
	currentPath : '',
	profile     : {}
});

export function setState$(value, action) {
	switch (action) {
		case 'setFiles': // expects value to be an array of files
			state$.next({ ...state$.value, files: value });
			break;
		case 'setProfile':
			state$.next({ ...state$.value, profile: value });
			break;
		default:
			throw new Error('Invalid action.');
	}
}
