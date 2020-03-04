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
	filesContinued: [],
	hasMore: false,
	queriedFiles: [],
	starredFiles: [],
	profile: {},
	userSpace: {}
});

export function setState$(value, action) {
	switch (action) {
		case 'init':
			{
				const { files, profile, userSpace } = value;
				let starredFiles = [];

				if (localStorage.getItem('starredFiles')) {
					starredFiles = JSON.parse(localStorage.getItem('starredFiles'));
				}
				else {
					localStorage.setItem('starredFiles', JSON.stringify([]));
				}

				const state = { ...state$.value, files, profile, userSpace, starredFiles };

				state$.next(state);
			}
			break;
		case 'setFiles':
			{
				const { files, filesContinued, hasMore } = value;
				state$.next({
					...state$.value,
					files,
					filesContinued,
					hasMore
				});
			}
			break;
		case 'setStarredFiles':
			{
				const { files, starredFiles } = value;
				localStorage.setItem('starredFiles', JSON.stringify(starredFiles));
				state$.next({ ...state$.value, files, starredFiles });
			}
			break;
		case 'setQueriedFiles':
			state$.next({ ...state$.value, queriedFiles: value });
			break;
		default:
			throw new Error('Invalid action provided to "setState$".');
	}
}
