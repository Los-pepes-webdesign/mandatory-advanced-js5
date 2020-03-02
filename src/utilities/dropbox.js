import { Dropbox } from 'dropbox';
import { setState$ } from './store';
import { formatSize } from './helpers';

export const dropbox = new Dropbox({
	clientId: 'wwft9hg3g9qhuth',
	fetch
});

// initates global state (root content, profile information, space usage)
export function init() {
	Promise.all([
		dropbox.filesListFolder({ path: '' }),
		dropbox.usersGetSpaceUsage(),
		dropbox.usersGetCurrentAccount()
	])
		.then(([ { entries }, userSpace, profile ]) => {
			let files = entries.filter((path) => path['.tag'] === 'file');
			const folders = entries.filter((path) => path['.tag'] === 'folder');

			Promise.all([
				...files.map(({ path_lower }) => dropbox.filesGetTemporaryLink({ path: path_lower })),
				dropbox.filesGetThumbnailBatch({
					entries: files.map(({ path_lower }) => ({
						path: path_lower,
						size: 'w64h64'
					}))
				})
			])
				.then((response) => {
					const links = response.slice(0, response.length - 1);
					let thumbnails = response[response.length - 1];

					thumbnails = thumbnails.entries.map(({ thumbnail }) => {
						if (thumbnail) {
							return thumbnail;
						}

						return '';
					});

					files = [
						...folders,
						...files.map((file, index) => ({
							...file,
							link: links[index].link,
							thumbnail: thumbnails[index],
							size: formatSize(file.size)
						}))
					];

					setState$({ files, profile, userSpace }, 'init');
				})
				.catch(console.error);
		})
		.catch(console.error);
}

// gets and formats folder content and its props (links, thumbnails)
export function getFolderContent(path) {
	dropbox
		.filesListFolder({ path })
		.then(({ entries }) => {
			const { sortedFiles, filesContinued, hasMore, folders } = sortFiles(entries);

			Promise.all([
				...sortedFiles.map(({ path_lower }) => dropbox.filesGetTemporaryLink({ path: path_lower })),
				dropbox.filesGetThumbnailBatch({
					entries: sortedFiles.map(({ path_lower }) => ({
						path: path_lower,
						size: 'w64h64'
					}))
				})
			])
				.then((response) => {
					const _files = sortedFiles;
					let _links = response.slice(0, response.length - 1);
					_links = _links.map((link) => link.link);
					let _thumbnails = response.splice(-1);
					_thumbnails = _thumbnails[0].entries.map(({ thumbnail }) => {
						if (thumbnail) {
							return thumbnail;
						}

						return '';
					});

					const files = [ ...folders, ...formatFiles(_files, _links, _thumbnails) ];

					setState$({ files, filesContinued, hasMore }, 'setFiles');
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
		sortedFiles = sortedFiles.slice(0, 25);
		filesContinued = sortedFiles.slice(25);
		hasMore = true;
	}

	return {
		folders,
		sortedFiles,
		filesContinued,
		hasMore
	};
}

// adds thumbnail and link properties to every file object
function formatFiles(files, links, thumbnails) {
	return [
		...files.map((file, index) => ({
			...file,
			link: links[index],
			thumbnail: thumbnails[index],
			size: formatSize(file.size)
		}))
	];
}
