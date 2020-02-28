// FUNCTION: usedSpaceFormatting(), takes argument value as a number in bytes format
// and returns the value formatted to 2 decimals and with a suffix (bytes, KB, MB, GB, TB)
export function usedSpaceFormatting(value) {
	const kb = 1e3;
	const mb = 1e6;
	const gb = 1e9;
	const tb = 1e12;
	const pb = 1e15;

	if (value < kb) {
		return value + ' bytes';
	}
	else if (value < mb && value > kb) {
		let decimalized = value / kb;
		let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + ' KB';
		return formatted;
	}
	else if (value < gb && value > mb) {
		let decimalized = value / mb;
		let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + ' MB';
		return formatted;
	}
	else if (value < tb && value > gb) {
		let decimalized = value / gb;
		let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + ' GB';
		return formatted;
	}
	else if (value < pb && value > tb) {
		let decimalized = value / gb;
		let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + ' TB';
		return formatted;
	} else {
		throw new Error('Invalid size.');
	}
}

// FUNCTION: maxSpaceFormatting(), takes argument value as a number in bytes formatted
// and returns the value as an fromatted to an integer and with suffix (GB or TB)
export function maxSpaceFormatting(value) {
	const gb = 1e9;
	const tb = 1e12;
	const pb = 1e15;
	if (value > gb && value < tb) {
		const maxSpaceDecimalized = value / gb;
		const maxSpaceFormatted = Math.round((maxSpaceDecimalized + Number.EPSILON) * 1) / 1 + ' GB';
		return maxSpaceFormatted;
	} else if (value > tb && value < pb) {
		const maxSpaceDecimalized = value / tb;
		const maxSpaceFormatted = Math.round((maxSpaceDecimalized + Number.EPSILON) * 1) / 1 + ' TB';
		return maxSpaceFormatted;
	} else {
		throw new Error('Invalid size.');
	}

}
