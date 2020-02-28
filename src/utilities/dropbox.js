import { Dropbox } from 'dropbox';
import { setState$ } from './store';
import { formatSize } from './helpers';

export const dropbox = new Dropbox({
	clientId: 'wwft9hg3g9qhuth',
	fetch
});

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
