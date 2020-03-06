import { Dropbox } from 'dropbox';
import { setState$, state$, useObservable } from './store';
import { formatSize } from './helpers';

export const dropbox = new Dropbox({
	clientId: 'wwft9hg3g9qhuth',
	fetch
});

// adds thumbnail and link properties to every file object
function formatFiles(files, links, thumbnails) {
	return [
		...files.map((file, index) => ({
			...file,
			link: links[index],
			thumbnail: thumbnails[index],
			size: formatSize(file.size),
			starred: false
		}))
	];
}

// sorts links and thumbnails into two arrays containing only relevant data
function sortLinksAndThumbs(response) {
	let links = response.slice(0, response.length - 1);
	links = links.map((link) => link.link);

	let thumbnails = response.splice(-1);
	thumbnails = thumbnails[0].entries.map(({ thumbnail }) => {
		if (thumbnail) return thumbnail;
		else return '';
	});

	return { links, thumbnails };
}

// available only if filesContinued.length is > 0
export function getMoreFiles() {
	let { files, filesContinued, hasMore } = state$.value;

	let currentFiles;

	if (filesContinued.length > 25) {
		currentFiles = filesContinued.slice(0, 25);
		filesContinued = filesContinued.slice(25, -1);
	}
	else {
		currentFiles = filesContinued;
		filesContinued = [];
		hasMore = false;
	}

	Promise.all([
		...currentFiles.map(({ path_lower }) =>
			dropbox.filesGetTemporaryLink({ path: path_lower })
		),
		dropbox.filesGetThumbnailBatch({
			entries: currentFiles.map(({ path_lower }) => ({
				path: path_lower,
				size: 'w64h64'
			}))
		})
	]).then((response) => {
		const { links, thumbnails } = sortLinksAndThumbs(response);
		files = [ ...files, ...formatFiles(currentFiles, links, thumbnails) ];

		setState$({ files, filesContinued, hasMore }, 'setFiles');
	});
}

// gets and formats folder content and its props (links, thumbnails)
export function getFolderContent(path) {
	dropbox
		.filesListFolder({ path })
		.then(({ entries, cursor }) => {
			// poll(cursor, path);

			const { sortedFiles, filesContinued, hasMore, folders } = sortFiles(entries);

			Promise.all([
				...sortedFiles.map(({ path_lower }) =>
					dropbox.filesGetTemporaryLink({ path: path_lower })
				),
				dropbox.filesGetThumbnailBatch({
					entries: sortedFiles.map(({ path_lower }) => ({
						path: path_lower,
						size: 'w64h64'
					}))
				})
			])
				.then((response) => {
					const { links, thumbnails } = sortLinksAndThumbs(response);
					let files = [ ...folders, ...formatFiles(sortedFiles, links, thumbnails) ];

					if (localStorage.getItem('starredFiles')) {
						const starredFiles = JSON.parse(localStorage.getItem('starredFiles'));
						files = files.map((file) => {
							const starredFile = starredFiles.find((_file) => _file.id === file.id);
							return starredFile ? starredFile : file;
						});
					}

					setState$({ files, filesContinued, hasMore }, 'setFiles');
				})
				.catch(console.error);
		})
		.catch(console.error);
}

// gets and formats queried files and folders
export function getQueriedContent(query) {
	dropbox.filesSearch({ path: '', query }).then(({ matches }) => {
		const queries = matches.map(({ metadata }) => metadata);
		const folders = queries.filter((query) => query['.tag'] === 'folder');
		let files = queries.filter((query) => query['.tag'] === 'file');

		Promise.all(
			files.map(({ path_lower }) => dropbox.filesGetTemporaryLink({ path: path_lower }))
		)
			.then((response) => {
				console.log(response);
				files = [
					...folders,
					...response.map(({ metadata, link }) => ({
						...metadata,
						size: formatSize(metadata.size),
						link
					}))
				];

				if (localStorage.getItem('starredFiles')) {
					const starredFiles = JSON.parse(localStorage.getItem('starredFiles'));
					files = files.map((file) => {
						const starredFile = starredFiles.find((_file) => _file.id === file.id);
						return starredFile ? starredFile : file;
					});
				}

				setState$(files, 'setQueriedFiles');
			})
			.catch(console.error);
	});
}

// function poll(cursor, path) {
// 	console.log(cursor);

// 	dropbox
// 		.filesListFolderLongpoll({
// 			cursor,
// 			timeout: 30
// 		})
// 		.then(({ changes }) => {
// 			console.log(changes);

// 			if (!changes) {
// 				poll(cursor);
// 			}
// 			else {
// 				getFolderContent('');
// 			}
// 		});
// }

// initates global state (root content, profile information, space usage)
export function init() {
	Promise.all([
		dropbox.filesListFolder({ path: '' }),
		dropbox.usersGetSpaceUsage(),
		dropbox.usersGetCurrentAccount()
	])
		.then(([ { entries, cursor }, userSpace, profile ]) => {
			// poll(cursor, '');

			let files = entries.filter((path) => path['.tag'] === 'file');
			const folders = entries.filter((path) => path['.tag'] === 'folder');

			Promise.all([
				...files.map(({ path_lower }) =>
					dropbox.filesGetTemporaryLink({ path: path_lower })
				),
				dropbox.filesGetThumbnailBatch({
					entries: files.map(({ path_lower }) => ({
						path: path_lower,
						size: 'w64h64'
					}))
				})
			])
				.then((response) => {
					const { links, thumbnails } = sortLinksAndThumbs(response);

					files = [ ...folders, ...formatFiles(files, links, thumbnails) ];

					if (localStorage.getItem('starredFiles')) {
						const starredFiles = JSON.parse(localStorage.getItem('starredFiles'));
						files = files.map((file) => {
							const starredFile = starredFiles.find((_file) => _file.id === file.id);
							return starredFile ? starredFile : file;
						});
					}

					setState$({ files, profile, userSpace }, 'init');
				})
				.catch(console.error);
		})
		.catch(console.error);
}

// sorts entries into files, folders, filesContinued
function sortFiles(entries) {
	const folders = entries.filter((path) => path['.tag'] === 'folder');
	let sortedFiles = entries.filter((path) => path['.tag'] === 'file');
	let filesContinued = [];
	let hasMore = false;

	if (sortedFiles.length > 25) {
		filesContinued = sortedFiles.slice(25);
		sortedFiles = sortedFiles.slice(0, 25);
		hasMore = true;
	}

	return {
		folders,
		sortedFiles,
		filesContinued,
		hasMore
	};
}
