import { useState, useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
<<<<<<< HEAD

export const dropbox = new Dropbox({
	clientId: 'wwft9hg3g9qhuth',
	fetch
});
=======
import { dropbox } from './dropbox';
>>>>>>> 471f961e9d593d0fba1b7be18b3a9f745eca95ff

export const token$ = new BehaviorSubject(localStorage.getItem('token'));
dropbox.setAccessToken(token$.value);

dropbox.setAccessToken(token$.value);

export const setToken$ = (token) => {
	console.log('SET TOKEN');
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
<<<<<<< HEAD
	currentPath: '',
	profile: {},
	queriedFiles: [],
=======
	filesContinued: [],
	hasMore: false,
	queriedFiles: [],
	profile: {},
>>>>>>> 471f961e9d593d0fba1b7be18b3a9f745eca95ff
	userSpace: {}
});

export function setState$(value, action) {
	switch (action) {
		case 'init': // expects value to be an object
			{
				const { files, profile, userSpace } = value;
				state$.next({ ...state$.value, files, profile, userSpace });
			}
			break;
		case 'setFiles': // expects value to be an array of files
			{
				const { files, filesContinued, hasMore } = value;
				state$.next({ ...state$.value, files, filesContinued, hasMore });
			}
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
