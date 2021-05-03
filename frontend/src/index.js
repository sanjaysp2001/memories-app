import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import thunk from 'redux-thunk';
import reducers from './reducers'
import App from './App';
import './index.css';

const store = createStore(reducers,compose(applyMiddleware(thunk)));


ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>,
    document.getElementById('root'));