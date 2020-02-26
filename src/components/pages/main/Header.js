import React, { useState } from 'react';
import { Redirect } from 'react-router';
import SearchIcon from '@material-ui/icons/Search';
import { dropbox, state$ } from '../../../utilities/store';

export default function Header() {
	const [ filterSearch, updateFilterSearch ] = useState(
		''
	);
	const [ focus, updateFocus ] = useState(false);

	function filter(e) {
		updateFilterSearch(e.target.value);
	}

	function onFocus() {
		updateFocus(true);
	}

	function search(e) {
		e.preventDefault();
		dropbox
			.filesSearch({
				path: '',
				query: filterSearch.toLowerCase()
			})
			.then((response) => {
				console.log(response);
			});
	}

	console.log(filterSearch);
	return (
		<React.Fragment>
			{focus && <Redirect to="/search" />}
			<header className="header">
				<form className="header__form">
					<input
						className="header__form__input"
						type="text"
						placeholder="search"
						value={filterSearch}
						onChange={filter}
						onFocus={onFocus}
					/>

					<button
						className="header__form__button"
						name="button"
						onClick={search}
					>
						<SearchIcon
							style={{ color: '#900C3F' }}
						/>
					</button>
				</form>
			</header>
		</React.Fragment>
	);
}
