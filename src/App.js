import React from 'react';
import Main from './components/pages/Main.js';
import Login from './components/pages/Login.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/App.scss';

function App() {
	return (
		<div className='App'>
			<HelmetProvider>
				<Router>
					<Route path='/login' component={Login} />
					<Route path='/' component={Main} />
				</Router>
			</HelmetProvider>
		</div>
	);
}

export default App;
