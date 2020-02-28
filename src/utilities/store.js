import { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { dropbox } from './dropbox';

export const token$ = new BehaviorSubject(localStorage.getItem('token'));
dropbox.setAccessToken(token$.value);

export const setToken$ = (token) => {
	if (!token) localStorage.removeItem('token');
	else localStorage.setItem('token', token);

	dropbox.setAccessToken(token);
	token$.next(token);
};

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
	files: [],
	currentPath: '',
	profile: {},
	queriedFiles: [],
	userSpace: {}
});

export function setState$(value, action) {
	switch (action) {
		case 'init':
			const { files, profile, userSpace } = value;
			state$.next({ ...state$.value, files, profile, userSpace });
			break;
		case 'setFiles': // expects value to be an array of files
			state$.next({ ...state$.value, files: value });
			break;
		case 'setProfile':
			state$.next({ ...state$.value, profile: value });
			break;
		case 'setQueriedFiles':
			state$.next({ ...state$.value, queriedFiles: value });
			break;
		case 'setUserSpace':
			state$.next({ ...state$.value, userSpace: value });
			break;
		default:
			throw new Error('Invalid action.');
	}
}

export const imageExtensions = [ 'jpg', 'jpeg', 'png', 'bmp', 'gif', 'webp' ];
