// FUNCTION: usedSpaceFormatting(), return value of currently used space on PepesBox formatted to two decimals with suffix (bytes, KB, MB, GB)
export function usedSpaceFormatting(userSpace) {
	const kb = 1e3;
	const mb = 1e6;
	const gb = 1e9;
	const tb = 1e12;

	if (userSpace.used < kb) {
		return userSpace.used + ' bytes';
	}
	else if (userSpace.used < mb && userSpace.used > kb) {
		let decimalized = userSpace.used / kb;
		let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + ' KB';
		return formatted;
	}
	else if (userSpace.used < gb && userSpace.used > mb) {
		let decimalized = userSpace.used / mb;
		let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + ' MB';
		return formatted;
	}
	else if (userSpace.used < tb && userSpace.used > gb) {
		let decimalized = userSpace.used / gb;
		let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + ' GB';
		return formatted;
	}
}

// FUNCTION: maxSpaceFormatting(), returns value of the currently max storage space of PepesBox formatted to integral with suffix GB
export function maxSpaceFormatting(userSpace) {
	const gb = 1e9;
	const maxSpaceDecimalized = userSpace.allocation.allocated / gb;
	const maxSpaceFormatted = Math.round((maxSpaceDecimalized + Number.EPSILON) * 1) / 1 + ' GB';
	return maxSpaceFormatted;
}
