import React from 'react';
import Main from './components/pages/main/Main';
import Login from './components/pages/login/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/App.scss';

function App() {
	return (
		<HelmetProvider>
			<Router>
				<Route path='/login' component={Login} />
				<Route path='/' component={Main} />
			</Router>
		</HelmetProvider>
	);
}

export default App;
