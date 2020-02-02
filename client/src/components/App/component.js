import React, { useEffect } from 'react';
import MainPage from '../ToolPage';
import Header from '../Header';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { checkStatus } from './appSlice';
import { connect } from 'react-redux';

import ErrorBoundary from './errorBoundary';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotFound = ({ location }) => (
	<div>
		<h3>
			Did not found page <code>{location.pathname}</code>
		</h3>
	</div>
);

NotFound.propTypes = {
	location: PropTypes.object
};

const App = () => {
	return (
		<>
			<Router>
				<ErrorBoundary>
					<CssBaseline />
					<Header />
					<Switch>
						<Route exact path='/set/:data' component={MainPage} />
						<Route exact path='/simple/:from/:to/:type/:name/:depth?' component={MainPage} />
						<Route exact path='/:id?/:auto?' component={MainPage} />
						<Route component={NotFound} />
					</Switch>
				</ErrorBoundary>
				<ToastContainer
					position='bottom-right'
					autoClose={2500}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnVisibilityChange
					draggable={false}
					pauseOnHover
				/>
			</Router>
		</>
	);
};

export default App;
