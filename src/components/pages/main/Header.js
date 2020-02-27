import React, { useState } from 'react';
import { Redirect } from 'react-router';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import { dropbox, setState$ } from '../../../utilities/store';

export default function Header() {
	const [ filterSearch, updateFilterSearch ] = useState('');
	const [ focus, updateFocus ] = useState(null);

	function filter(e) {
		updateFilterSearch(e.target.value);
	}

	function onFocus() {
		updateFocus('true');
	}

	function onBlur() {
		updateFocus('false');
		updateFilterSearch('');
		setState$([], 'setQueriedFiles');
	}

	function search(e) {
		e.preventDefault();
		dropbox
			.filesSearch({
				path  : '',
				query : filterSearch.toLowerCase()
			})
			.then((response) => {
				const queries = response.matches.map(({ metadata }) => metadata);
				setState$(queries, 'setQueriedFiles');
			});
	}

	return (
		<React.Fragment>
			{focus === 'true' && <Redirect to='/search' />}
			{focus === 'false' && <Redirect to='/' />}
			<header className='header'>
				<form className='header__form'>
					<input
						className='header__form__input'
						type='text'
						placeholder='search'
						required
						minLength={1}
						maxLength={100}
						value={filterSearch}
						onChange={filter}
						onFocus={onFocus}
					/>

					<button className='header__form__button' name='button' onClick={search}>
						<SearchIcon
							style={{
								color : '#900C3F'
							}}
						/>
					</button>
				</form>
				<button
					className='header__closeButton'
					style={{
						opacity       : focus === 'true' ? 1 : 0,
						pointerEvents : focus === 'true' ? 'all' : 'none',
						color         : '#900C3F'
					}}
					onClick={onBlur}
				>
					<CloseIcon />
				</button>
			</header>
		</React.Fragment>
	);
}
