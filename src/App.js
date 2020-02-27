import React from 'react';
import Main from './components/pages/main/Main';
import Login from './components/pages/login/Login';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/App.scss';

function App() {
	return (
		<HelmetProvider>
			<Router>
				<Switch>
					<Route
						path="/login"
						component={Login}
					/>
					<Route path="/" component={Main} />
				</Switch>
			</Router>
		</HelmetProvider>
	);
}

export default App;
