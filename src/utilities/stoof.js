let paths = [ '', 'path1', 'path2', 'path3' ];
paths = paths.map((path, i) =>
	paths.reduce((acc, val, idx) => {
		if (idx === i) {
			return {
				title: path === '' ? 'Home' : path,
				path: `${acc}/${val}`
			};
		}

		if (typeof acc === 'object') return acc;
		else return `${acc}/${val}`;
	})
);

paths.shift();

console.log(paths);
