import React from 'react';
export default function Header() {
	return (
		<header
			className='login__header'
			style={{
				background: `no-repeat center 65% / 20% url(${process.env
					.PUBLIC_URL}/assets/MexicanHampus.png), no-repeat url(${process.env
					.PUBLIC_URL}/assets/login/header.svg)`
			}}
		/>
	);
}
