import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

export default function Header() {
	return (
		<header className="header">
			<form className="header__form">
				<input className="header__form__input" type="text" placeholder="search" />

				<button className="header__form__button" name="button">
					<SearchIcon style={{ color: '#900C3F' }} />
				</button>
			</form>
		</header>
	);
}
