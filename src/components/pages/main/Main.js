import React from 'react';
import { Redirect } from 'react-router';

export default function Main() {
	if (window.location.hash.length < 2) return <Redirect to='/login' />;
	return <main />;
}
