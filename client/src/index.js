import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import theme from './theme';

import { ThemeProvider } from '@material-ui/core/styles';

import { configureStore } from '@reduxjs/toolkit'

import App from './components/App/container';

import rootReducer from './reducer';

const store = configureStore({
	reducer: rootReducer,
});

ReactDOM.render(<Provider store={store}>
	<ThemeProvider theme={theme}>
	<App />
	</ThemeProvider>
</Provider>, document.getElementById('app'));
