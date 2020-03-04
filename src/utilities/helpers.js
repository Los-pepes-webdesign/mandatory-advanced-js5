import { state$, setState$ } from './store';

// FUNCTION: formatSize(), takes argument value as a number in bytes format
// and returns the value formatted to 2 decimals and with a suffix (bytes, KB, MB, GB, TB)
export function formatSize(size) {
	const kb = 1e3;
	const mb = 1e6;
	const gb = 1e9;
	const tb = 1e12;
	const pb = 1e15;

	if (size < kb) {
		return size + ' bytes';
	}
	else if (size < mb && size > kb) {
		let decimalized = size / kb;
		let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + ' KB';
		return formatted;
	}
	else if (size < gb && size > mb) {
		let decimalized = size / mb;
		let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + ' MB';
		return formatted;
	}
	else if (size < tb && size > gb) {
		let decimalized = size / gb;
		let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + ' GB';
		return formatted;
	}
	else if (size < pb && size > tb) {
		let decimalized = size / gb;
		let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + ' TB';
		return formatted;
	}
	else {
		return '';
	}
}

// FUNCTION: maxSpaceFormatting(), takes argument value as a number in bytes formatted
// and returns the value as rounded to integer and with suffix (GB or TB)
export function formatMaxSpace(size) {
	const gb = 1e9;
	const tb = 1e12;
	const pb = 1e15;
	if (size > gb && size < tb) {
		const maxSpaceDecimalized = size / gb;
		const maxSpaceFormatted = Math.round(maxSpaceDecimalized) + ' GB';
		return maxSpaceFormatted;
	}
	else if (size > tb && size < pb) {
		const maxSpaceDecimalized = size / tb;
		const maxSpaceFormatted = Math.round(maxSpaceDecimalized) + ' TB';
		return maxSpaceFormatted;
	}
	else {
		throw new Error('Invalid size.');
	}
}

export function formatPaths(stones) {
	const paths = stones.map((stone, i) =>
		stones.reduce((acc, val, idx) => {
			if (idx === i) {
				return {
					title: stone === '' ? '' : stone,
					path: `${acc}/${val}`
				};
			}
			if (typeof acc === 'object') {
				return acc;
			}
			else {
				return `${acc}/${val}`;
			}
		})
	);

	paths.shift();

	return paths;
}

export function toggleStar(file) {
	const modifiedFile = { ...file, starred: !file.starred };
	const files = state$.value.files.map(
		(_file) => (_file.id === modifiedFile.id ? modifiedFile : _file)
	);
	let starredFiles;

	if (file.starred) {
		starredFiles = state$.value.starredFiles.filter((_file) => _file.id !== modifiedFile.id);
	}
	else {
		starredFiles = [ ...state$.value.starredFiles, modifiedFile ];
	}

	console.log(starredFiles);

	setState$({ files, starredFiles }, 'setStarredFiles');
}
