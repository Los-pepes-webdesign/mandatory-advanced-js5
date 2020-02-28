// FUNCTION: usedSpaceFormatting(), return value of currently used space on PepesBox formatted to two decimals with suffix (bytes, KB, MB, GB)
export function formatSize(size) {
	const kb = 1e3;
	const mb = 1e6;
	const gb = 1e9;
	const tb = 1e12;

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
}
