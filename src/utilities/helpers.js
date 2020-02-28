// userSpace values are defined in bytes therefore we need to make sure they are correctly formatted
// FUNCTION: userSpaceFormatting(), converts space values to a more user friendly format
export function formatUserSpace(userSpace) {
	console.log(userSpace);

	const kb = 1e3;
	const mb = 1e6;
	const gb = 1e9;
	const tb = 1e12;
	const maxSpaceDecimalized = userSpace.allocation.allocated / gb;
	const maxSpaceFormatted = Math.round((maxSpaceDecimalized + Number.EPSILON) * 1) / 1 + ' GB';

	if (userSpace.used < kb) {
		return userSpace.used + ' bytes of ' + maxSpaceFormatted + ' used';
	}
	else if (userSpace.used < mb && userSpace.used > kb) {
		let decimalized = userSpace.used / kb;
		let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + ' KB';
		return formatted + ' of ' + maxSpaceFormatted + ' used';
	}
	else if (userSpace.used < gb && userSpace.used > mb) {
		let decimalized = userSpace.used / mb;
		let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + ' MB';
		return formatted + ' of ' + maxSpaceFormatted + ' used';
	}
	else if (userSpace.used < tb && userSpace.used > gb) {
		let decimalized = userSpace.used / gb;
		let formatted = Math.round((decimalized + Number.EPSILON) * 100) / 100 + ' GB';
		return formatted + ' of ' + maxSpaceFormatted + ' used';
	}
}
