// FUNCTION: formatSize(), takes argument value as a number in bytes format
// and returns the value formatted to 2 decimals and with a suffix (bytes, KB, MB, GB, TB)
export function formatSize(size) {
	const kb = 1e3;
	const mb = 1e6;
	const gb = 1e9;
	const tb = 1e12;
	const pb = 1e15;


 // Hur importerar man userSpace från global state hit?
 // Det räcker med en formatSize funktion om man kör denna if-satsen
 // för att se om size är === totalt utrymme
 // isf return integer GB/
 // =======================================================================================================
	// if (size === userSpace.allocation.allocated) {
	// 	if (size > gb && size < tb) {
	// 		const maxSpaceDecimalized = size / gb;
	// 		const maxSpaceFormatted = Math.round((maxSpaceDecimalized + Number.EPSILON) * 1) / 1 + ' GB';
	// 		return maxSpaceFormatted;
	// 	} else if (size > tb && size < pb) {
	// 		const maxSpaceDecimalized = size / tb;
	// 		const maxSpaceFormatted = Math.round((maxSpaceDecimalized + Number.EPSILON) * 1) / 1 + ' TB';
	// 		return maxSpaceFormatted;
	// 	} else {
	// 		throw new Error('Invalid size.');
	// 	}
	// }
	// =======================================================================================================


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
	} else {
		throw new Error('Invalid size.');
	}
}


// FUNCTION: maxSpaceFormatting(), takes argument value as a number in bytes formatted
// and returns the value as an fromatted to an integer and with suffix (GB or TB)
export function maxSpaceFormatting(size) {
	const gb = 1e9;
	const tb = 1e12;
	const pb = 1e15;
	if (size > gb && size < tb) {
		const maxSpaceDecimalized = size / gb;
		const maxSpaceFormatted = Math.round((maxSpaceDecimalized + Number.EPSILON) * 1) / 1 + ' GB';
		return maxSpaceFormatted;
	} else if (size > tb && size < pb) {
		const maxSpaceDecimalized = size / tb;
		const maxSpaceFormatted = Math.round((maxSpaceDecimalized + Number.EPSILON) * 1) / 1 + ' TB';
		return maxSpaceFormatted;
	} else {
		throw new Error('Invalid size.');
	}
}
