import React from 'react';

export default function Content({files}) {
	console.log(files);
	return (
		<main className='content'>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Modified</th>
						<th></th>
					</tr>
				</thead>
				<tbody>

			{files.map((files) =>
				<tr>
					<td>{files.name}</td>
					<td>{files.server_modified}</td>
					<td></td>
				</tr>
			)}
				</tbody>
			</table>
		</main>
		)
}
